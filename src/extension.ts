import * as vscode from 'vscode';
import {handleNorminette, initNorminette} from "./norminette";
import {handleMakefile, initMakefile} from "./makefile";

export function activate(context: vscode.ExtensionContext) {

    initNorminette();
    initMakefile();

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('norminette');
    context.subscriptions.push(diagnosticCollection);

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(doc => handleDocument(doc, diagnosticCollection))
    );

    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(doc => handleDocument(doc, diagnosticCollection))
    );

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                handleDocument(editor.document, diagnosticCollection).then();
            }
        })
    );

    vscode.workspace.textDocuments.forEach(doc => handleDocument(doc, diagnosticCollection));

}

async function handleDocument(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {

    if (document.fileName.endsWith('.c') || document.fileName.endsWith('.h')) {
        handleNorminette(document, collection).then();
    }

    const fileName = document.fileName.split('/').pop()?.toLowerCase();
    if (fileName === "makefile") {
        handleMakefile(document, collection).then();
    }

}