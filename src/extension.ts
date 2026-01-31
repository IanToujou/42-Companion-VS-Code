import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import defaultDictionary, { NormDictionary } from './dictionary/NormDictionary';
import { NormSeverity } from './dictionary/NormSeverity';

const execAsync = promisify(exec);

let warningDecorationType: vscode.TextEditorDecorationType;
let checkInterval: NodeJS.Timeout | undefined;
let extensionPath: string;
let normDictionary: NormDictionary;

export function activate(context: vscode.ExtensionContext) {
    extensionPath = context.extensionPath;
    normDictionary = defaultDictionary();

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('norminette');
    context.subscriptions.push(diagnosticCollection);

    warningDecorationType = vscode.window.createTextEditorDecorationType({
        textDecoration: 'underline wavy',
        dark: { borderColor: '#ff1fb9' },
        light: { borderColor: '#770c7e' },
        borderWidth: '0 0 2px 0',
        borderStyle: 'wavy'
    });

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(doc => checkDocument(doc, diagnosticCollection))
    );

    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(doc => checkDocument(doc, diagnosticCollection))
    );

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                checkDocument(editor.document, diagnosticCollection);
            }
        })
    );

    checkInterval = setInterval(() => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            checkDocument(editor.document, diagnosticCollection);
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
    const decorations: vscode.DecorationOptions[] = [];

    const errorRegex = /^(Error|Notice):\s+(\w+)\s+\(line:\s+(\d+),\s+col:\s+(\d+)\)/gm;

    let match;
    while ((match = errorRegex.exec(output)) !== null) {
        const [, , errorCode, lineStr, colStr] = match;
        const line = parseInt(lineStr) - 1;
        const col = parseInt(colStr) - 1;

        // Look up error in dictionary
        const entry = normDictionary.data.find(e => e.errorCode === errorCode);

        if (!entry) {
            // Fallback if not in dictionary
            const range = new vscode.Range(line, col, line, col + 10);
            const diagnostic = new vscode.Diagnostic(
                range,
                errorCode,
                vscode.DiagnosticSeverity.Warning
            );
            diagnostic.source = 'norminette';
            diagnostics.push(diagnostic);
            decorations.push({ range });
            continue;
        }

        // Calculate range based on dictionary entry
        let startCol: number, endCol: number;
        const rangeValue = entry.range || 10;

        if (rangeValue >= 0) {
            // Positive: origin to origin + range
            startCol = col;
            endCol = col + rangeValue;
        } else {
            // Negative: (origin + range) to origin
            startCol = col + rangeValue;
            endCol = col + 1;
        }

        const range = new vscode.Range(line, Math.max(0, startCol), line, Math.max(0, endCol));

        // Map NormSeverity to VS Code severity
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

        decorations.push({ range });
    }

    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.uri.toString() === document.uri.toString()) {
        editor.setDecorations(warningDecorationType, decorations);
    }

    return diagnostics;
}

export function deactivate() {
    if (warningDecorationType) {
        warningDecorationType.dispose();
    }
    if (checkInterval) {
        clearInterval(checkInterval);
    }
}
