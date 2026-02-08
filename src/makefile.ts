import vscode from "vscode";
import defaultDictionary, {MakefileDictionary} from "./dictionary/MakefileDictionary";
import {MakefileSeverity} from "./dictionary/MakefileSeverity";

let dictionary: MakefileDictionary;

export function initMakefile() {
    dictionary = defaultDictionary();
}

export async function handleMakefile(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
    const diagnostics = parseMakefile(document);
    collection.set(document.uri, diagnostics);
}

function parseMakefile(document: vscode.TextDocument): vscode.Diagnostic[] {

    const diagnostics: vscode.Diagnostic[] = [];
    const text = document.getText();
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];
        if (line.startsWith('#') || line.length === 0) {
            continue;
        }

        for (const entry of dictionary.data) {

            if (entry.pattern.test(line)) {
                const range = entry.getRange ? entry.getRange(line, i) : null;

                if (range) {
                    const vscodeRange = new vscode.Range(i, range.start, i, range.end);
                    let severity: vscode.DiagnosticSeverity;
                    switch (entry.severity) {
                        case MakefileSeverity.Error:
                            severity = vscode.DiagnosticSeverity.Error;
                            break;
                        case MakefileSeverity.Warning:
                            severity = vscode.DiagnosticSeverity.Warning;
                            break;
                        case MakefileSeverity.Info:
                            severity = vscode.DiagnosticSeverity.Information;
                            break;
                    }
                    const diagnostic = new vscode.Diagnostic(
                        vscodeRange,
                        entry.errorMessage,
                        severity
                    );
                    diagnostic.source = '42 Companion: Makefile';
                    diagnostics.push(diagnostic);
                }
            }
        }

    }

    return diagnostics;

}