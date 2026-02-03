import * as vscode from 'vscode';
import {exec} from 'child_process';
import {promisify} from 'util';
import * as path from 'path';
import defaultDictionary, {NormDictionary} from './dictionary/NormDictionary';
import {NormSeverity} from './dictionary/NormSeverity';
import {NormRangeType} from "./dictionary/NormRange";

const execAsync = promisify(exec);

let checkInterval: NodeJS.Timeout | undefined;
let extensionPath: string;
let normDictionary: NormDictionary;

export function activate(context: vscode.ExtensionContext) {

    extensionPath = context.extensionPath;
    normDictionary = defaultDictionary();

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('norminette');
    context.subscriptions.push(diagnosticCollection);

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(doc => checkDocument(doc, diagnosticCollection))
    );

    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(doc => checkDocument(doc, diagnosticCollection))
    );

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                checkDocument(editor.document, diagnosticCollection).then();
            }
        })
    );

    checkInterval = setInterval(() => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            checkDocument(editor.document, diagnosticCollection).then();
        }
    }, 3000);

    vscode.workspace.textDocuments.forEach(doc => checkDocument(doc, diagnosticCollection));
}

async function checkDocument(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
    if (!document.fileName.endsWith('.c') && !document.fileName.endsWith('.h')) {
        return;
    }

    if (document.uri.scheme !== 'file') {
        return;
    }

    try {
        const norminettePath = path.join(extensionPath, 'bin', 'norminette');
        const { stdout, stderr } = await execAsync(`python3 ${norminettePath} ${document.fileName}`);
        const diagnostics = parseNorminette(stdout + stderr, document);
        collection.set(document.uri, diagnostics);
    } catch (error: any) {
        console.log(error);
        if (error.stdout) {
            const diagnostics = parseNorminette(error.stdout, document);
            collection.set(document.uri, diagnostics);
        }
    }
}

function parseNorminette(output: string, document: vscode.TextDocument): vscode.Diagnostic[] {

    const diagnostics: vscode.Diagnostic[] = [];
    const errorRegex = /^(Error|Notice):\s+(\w+)\s+\(line:\s+(\d+),\s+col:\s+(\d+)\)/gm;

    let match;
    while ((match = errorRegex.exec(output)) !== null) {

        const [, , errorCode, lineStr, colStr] = match;
        const line = parseInt(lineStr) - 1;
        const norminetteCol = parseInt(colStr) - 1;

        const lineText = document.lineAt(line).text;
        let visualCol = 0;
        let col = 0;
        while (visualCol < norminetteCol && col < lineText.length) {
            if (lineText[col] === '\t') {
                visualCol += 4;
            } else {
                visualCol++;
            }
            col++;
        }

        const entry = normDictionary.data.find(e => e.errorCode === errorCode);

        if (!entry) {
            continue;
        }

        let startCol: number = col;
        let endCol: number = col;

        if (entry.range) {

            if (entry.range.type === NormRangeType.NUMERIC) {

                startCol = col + (entry.range.start ?? 0);
                endCol = col + (entry.range.end ?? 0);

            } else if (entry.range.type === NormRangeType.DELIMITER) {

                const lineText = document.lineAt(line).text;

                if (entry.range.startDelimiters && entry.range.startDelimiters.length > 0) {
                    startCol = col;
                    if (entry.range.invertStartDelimiters) {
                        while (startCol > 0 && entry.range.startDelimiters.includes(lineText[startCol - 1])) {
                            startCol--;
                        }
                    } else {
                        while (startCol > 0 && !entry.range.startDelimiters.includes(lineText[startCol - 1])) {
                            startCol--;
                        }
                    }
                }

                if (entry.range.endDelimiters && entry.range.endDelimiters.length > 0) {
                    endCol = col;
                    if (entry.range.invertEndDelimiters) {
                        while (endCol < lineText.length && entry.range.endDelimiters.includes(lineText[endCol])) {
                            endCol++;
                        }
                    } else {
                        while (endCol < lineText.length && !entry.range.endDelimiters.includes(lineText[endCol])) {
                            endCol++;
                        }
                    }
                }

            }

        }

        const range = new vscode.Range(line, Math.max(0, startCol), line, Math.max(0, endCol));

        let vscodeSeverity: vscode.DiagnosticSeverity;
        switch (entry.severity) {
            case NormSeverity.Error:
                vscodeSeverity = vscode.DiagnosticSeverity.Error;
                break;
            case NormSeverity.Warning:
                vscodeSeverity = vscode.DiagnosticSeverity.Warning;
                break;
            case NormSeverity.Info:
                vscodeSeverity = vscode.DiagnosticSeverity.Information;
                break;
        }

        const diagnostic = new vscode.Diagnostic(
            range,
            `${entry.errorMessage}`,
            vscodeSeverity
        );

        diagnostic.source = 'norminette';
        diagnostics.push(diagnostic);

    }

    return diagnostics;
}

export function deactivate() {
    if (checkInterval) {
        clearInterval(checkInterval);
    }
}
