import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "i18ntools" is now active!');

  const disposable = vscode.commands.registerCommand(
    "i18ntools.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from i18nTools!");
    }
  );

  const replaceDisposable = vscode.commands.registerCommand(
    "i18ntools.replaceSelectedTextInProject",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("没有活动的编辑器");
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      if (!selectedText) {
        vscode.window.showInformationMessage("没有选中任何文字");
        return;
      }

      const newText = await vscode.window.showInputBox({
        prompt: "请输入要替换成的文字",
        placeHolder: "输入新的文字",
      });

      if (!newText) {
        return;
      }

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showInformationMessage("没有打开工作区");
        return;
      }

      const rootPath = workspaceFolders[0].uri.fsPath;

      const searchFiles = (dir: string) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            searchFiles(filePath);
          } else {
            const content = fs.readFileSync(filePath, "utf8");
            if (content.includes(selectedText)) {
              const newContent = content.replace(
                new RegExp(selectedText, "g"),
                newText
              );
              fs.writeFileSync(filePath, newContent, "utf8");
            }
          }
        }
      };

      searchFiles(rootPath);
      vscode.window.showInformationMessage("替换完成");
    }
  );

  context.subscriptions.push(disposable, replaceDisposable);
}
