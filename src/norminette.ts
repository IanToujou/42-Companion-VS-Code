import vscode, {DiagnosticSeverity} from "vscode";
import {NormRangeType} from "./dictionary/NormRange";
import {NormSeverity} from "./dictionary/NormSeverity";
import defaultDictionary, {NormDictionary} from "./dictionary/NormDictionary";
import {exec} from 'child_process';
import {promisify} from 'util';

const execAsync = promisify(exec);

let runningChecks: Map<string, Promise<void>>;
let dictionary: NormDictionary;
let fallback: boolean;

export function initNorminette() {
    runningChecks = new Map();
    dictionary = defaultDictionary();
    fallback = false;
}

export async function handleNorminette(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {

    const fileKey = document.uri.fsPath;
    if (runningChecks.has(fileKey)) {
        return runningChecks.get(fileKey);
    }

    const checkPromise = (async () => {

        let cmd: string = `norminette ${document.uri.fsPath}`;
        if (fallback) {
            cmd = `host-spawn norminette ${document.uri.fsPath}`;
        }

        try {
            const { stdout, stderr } = await execAsync(cmd, { timeout: 5000 });
            const diagnostics = parseNorminette(stdout + stderr, document);
            collection.set(document.uri, diagnostics);
        } catch (error: any) {
            if (!fallback && error.stderr.includes('norminette: command not found')) {
                fallback = true;
            }
            if (error.stdout) {
                const diagnostics = parseNorminette(error.stdout, document);
                collection.set(document.uri, diagnostics);
            }
        } finally {
            runningChecks.delete(fileKey);
        }
    })();

    runningChecks.set(fileKey, checkPromise);
    return checkPromise;

}

function parseNorminette(output: string, document: vscode.TextDocument): vscode.Diagnostic[] {

    const diagnostics: vscode.Diagnostic[] = [];
    const errorRegex = /^(Error|Notice):\s+(\w+)\s+\(line:\s+(\d+),\s+col:\s+(\d+)\)/gm;

    let match;
    while ((match = errorRegex.exec(output)) !== null) {

        const [, , errorCode, lineStr, colStr] = match;
        const line = parseInt(lineStr) - 1;
        const norminetteCol = parseInt(colStr) - 1;

        const entry = dictionary.data.find(e => e.errorCode === errorCode);
        if (!entry) {
            const lineText = document.lineAt(line).text;
            let visualCol = 0;
            let col = 0;
            while (visualCol < norminetteCol && col < lineText.length) {
                if (lineText[col] === '\t') {
                    visualCol = Math.floor(visualCol / 4) * 4 + 4;
                } else {
                    visualCol++;
                }
                col++;
            }
            const range = new vscode.Range(line, Math.max(0, col), line, Math.max(0, col));
            const diagnostic = new vscode.Diagnostic(
                range,
                `REPORT MISSING ERROR: ${errorCode}`,
                DiagnosticSeverity.Warning
            );
            diagnostic.source = '42 Companion: Norm Error';
            diagnostics.push(diagnostic);
            continue;
        }

        const lineText = document.lineAt(line).text;
        let visualCol = 0;
        let col = 0;
        while (visualCol < norminetteCol && col < lineText.length) {
            if (lineText[col] === '\t') {
                visualCol = Math.floor(visualCol / 4) * 4 + 4;
            } else {
                visualCol++;
            }
            col++;
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

            } else if (entry.range.type === NormRangeType.LINE) {

                const lineText = document.lineAt(line).text;
                const trimmedLine = lineText.trim();
                const trimStart = lineText.indexOf(trimmedLine);

                startCol = trimStart;
                endCol = trimStart + trimmedLine.length;

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

        diagnostic.source = '42 Companion: Norm Error';
        diagnostics.push(diagnostic);

    }

    return diagnostics;

}