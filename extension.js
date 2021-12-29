// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerTextEditorCommand('clampit.clampgenerator', async ( textEditor ) => {
		
		// vscode.window.showInformationMessage('Hello VS Code');

		const remSize = await vscode.window.showInputBox( { 
			prompt: 'REM size? (px)', 
			placeHolder: '10', 
			value: '10' 
		} )
		const minViewport = await vscode.window.showInputBox( { 
			prompt: 'Min viewport? (px)', 
			placeHolder: '768', 
			value: '768' 
		} );
		const maxViewport = await vscode.window.showInputBox( { 
			prompt: 'Max viewport? (px)', 
			placeHolder: '1440', 
			value: '1440' 
		} );
		const minFontSize = await vscode.window.showInputBox( { 
			prompt: 'Min font size? (rem)', 
			placeHolder: '1.5', 
			value: '1.5' 
		} );
		const maxFontSize = await vscode.window.showInputBox( { 
			prompt: 'Max font size? (rem)', 
			placeHolder: '2.5', 
			value: '2.5' 
		} );

		textEditor.edit( ( editBuilder ) => {
			editBuilder.insert( 
				textEditor.selection.active, 
				clampFunction( parseFloat( remSize ), parseFloat( minViewport ), parseFloat( maxViewport ), parseFloat( minFontSize ), parseFloat( maxFontSize ) ) );	
		});
	});

	context.subscriptions.push(disposable);
}

function clampFunction( pixelsPerRem, minWidthPx, maxWidthPx, minFontSize, maxFontSize ) {

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

	return `clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(
    4
  )}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize}rem)`;

}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
