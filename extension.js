const vscode = require('vscode');
const os = require('os');

function create_git_bash(name) {
	if(!name) name = 'webpuppy';
	return vscode.window.createTerminal(name, 'C:\\Program Files\\Git\\git-bash').show();
}

function create_z_shell(name) {
	return vscode.window.createTerminal(name, '/bin/zsh').show();
}

function handle_local_system(context) {
	// console.log(context.environmentVariableCollection);
	// console.log(vscode.window);
	const platform = os.platform();
	vscode.window.showInformationMessage(`WebPuppy Devtools Loaded for ${platform}`);
	switch(platform) {
		case 'win32':
			return create_git_bash('build_tools');
		case 'darwin':
			return create_z_shell('build_tools');
		case 'cygwin':
		case 'linux':
			return create_z_shell('build_tools');
		default:
			return;
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	//handle_local_system(context);
	// console.log(vscode.workspace.openTextDocument({content: 'foobar', language: 'htmlc'}));
	let disposable = vscode.commands.registerCommand('webpuppy.help', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('placeholder: help menu');
	});

	context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
