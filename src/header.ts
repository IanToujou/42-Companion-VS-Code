import vscode from "vscode";

export async function handleHeader(document: vscode.TextDocument): Promise<boolean> {

    const config = vscode.workspace.getConfiguration('42-companion.header');
    const username = config.get<string>('username', '');
    const email = config.get<string>('email', '');

    if (!username || !email) {
        return false;
    }

    const text = document.getText();

    if (hasHeader(text)) {
        return false;
    }

    const filename = document.fileName.split('/').pop() || '';
    const header = generateHeader(filename, username, email);

    const edit = new vscode.WorkspaceEdit();
    edit.insert(document.uri, new vscode.Position(0, 0), header);

    await vscode.workspace.applyEdit(edit);
    return true;
}

function hasHeader(text: string): boolean {

    const lines = text.split('\n');
    if (lines.length < 11) {
        return false;
    }

    return lines[0].startsWith("/* ************************************************************************** */");

}

function formatFilename(filename: string): string {
    return filename.padEnd(51);
}

function formatUserLine(username: string, email: string): string {
    const userPart = `By: ${username} <${email}>`;
    return userPart.padEnd(47);
}

function formatDateLine(label: string, date: Date, username: string): string {
    const dateStr = date.toISOString().slice(0, 19).replace('T', ' ');
    const datePart = `${label}: ${dateStr} by ${username}`;
    return datePart.padEnd(42);
}

function generateHeader(filename: string, username: string, email: string): string {

    const now = new Date();
    const header = [
        '/* ************************************************************************** */',
        '/*                                                                            */',
        '/*                                                        :::      ::::::::   */',
        `/*   ${formatFilename(filename)}:+:      :+:    :+:   */`,
        '/*                                                    +:+ +:+         +:+     */',
        `/*   ${formatUserLine(username, email)}+#+  +:+       +#+        */`,
        '/*                                                +#+#+#+#+#+   +#+           */',
        `/*   ${formatDateLine('Created', now, username)}        #+#    #+#             */`,
        `/*   ${formatDateLine('Updated', now, username)}       ###   ########.fr       */`,
        '/*                                                                            */',
        '/* ************************************************************************** */',
        '',
        ''
    ];

    return header.join('\n');
}