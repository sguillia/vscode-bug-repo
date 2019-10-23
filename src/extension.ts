import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "bug" is now active!');

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		bugrepro(context.extensionPath + '/hello.txt');
	});

	context.subscriptions.push(disposable);

	vscode.window.onDidChangeActiveTextEditor(editor => {
		console.log("event: onDidChangeActiveTextEditor", editor ? "<>" : "undefined");
	});
}

async function bugrepro(filePath: string) {
	var uri = vscode.Uri.parse('untitled:' + filePath);
	var newDocument = await vscode.workspace.openTextDocument(uri);

	let newEditor = await vscode.window.showTextDocument(newDocument);
	let success = await newDocument.save(); // <-- closes document
	console.log("Save success:", success);

	// This work-around does not work (either warns in the console "Should open in editor #undefined" or opens up document with full path as title)
	// await vscode.window.showTextDocument(newDocument);
}

// this method is called when your extension is deactivated
export function deactivate() { }
