import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { ITextReplacement } from "../type/textReplacement";
/***
 *  @description 单个文本全局替换
 * @returns
 */
export const singleReplacement = (oldText: string, newText: string) => {
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
        if (content.includes(oldText)) {
          const newContent = content.replace(new RegExp(oldText, "g"), newText);
          fs.writeFileSync(filePath, newContent, "utf8");
        }
      }
    }
  };
  searchFiles(rootPath);
};

/***
 * @description 多个文本全局替换
 * @returns
 */
export const multipleReplacement = (list: ITextReplacement[]) => {
  list.forEach((item) => {
    singleReplacement(item.oldText, item.newText);
  });
};
