import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { getActivationFileInfo } from "./utils/judgeFile";
import { json2Obj, toJSON } from "./utils/utils";
import { ITextReplacement } from "./type/textReplacement";
import { multipleReplacement } from "./globalTextReplacement";

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
      const fillInfo = getActivationFileInfo();
      if (fillInfo?.fileType !== "json") {
        vscode.window.showInformationMessage("请选择json文件");
        return;
      }

      const object = json2Obj(fillInfo.fileContent);
      const arr: ITextReplacement[] = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const keyArr = key.split(".");
          const newHou = object[key].trim().replace(/\./g, "");
          keyArr.pop();
          const element = keyArr.join(".") + "." + newHou;
          arr.push({
            oldText: key,
            newText: element,
          });
        }
      }
      multipleReplacement(arr);
      vscode.window.showInformationMessage("替换完成");
    }
  );

  context.subscriptions.push(disposable, replaceDisposable);
}
