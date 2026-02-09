import * as vscode from 'vscode';
import {handleNorminette, initNorminette} from "./norminette";
import {handleMakefile, initMakefile} from "./makefile";
import {handleHeader} from "./header";

const processingDocuments = new Set<string>();

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

    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (!workspaceFolder) {
        return;
    }

    const docKey = document.uri.toString();

    if (document.fileName.endsWith('.c') || document.fileName.endsWith('.h')) {
        if (processingDocuments.has(docKey)) {
            return;
        }
        processingDocuments.add(docKey);
        try {
            const modified = await handleHeader(document);
            if (modified) {
                await document.save();
            }
            await handleNorminette(document, collection);
        } finally {
            processingDocuments.delete(docKey);
        }
    }

    const fileName = document.fileName.split('/').pop()?.toLowerCase();
    if (fileName === "makefile") {
        handleMakefile(document, collection).then();
    }

}