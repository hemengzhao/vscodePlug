import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { ITextReplacement } from "../type/textReplacement";
/***
 *  @description 单个文本全局替换
 * @returns
 */
export const singleReplacement = async (oldText: string, newText: string) => {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showInformationMessage("没有打开工作区");
    return;
  }

  const rootPath = workspaceFolders[0].uri.fsPath;
  const srcPath = path.join(rootPath, "./src");
  const searchFiles = (dir: string) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const fileType = filePath.split(".").pop(); // 获取文件类型
      if (stat.isDirectory()) {
        searchFiles(filePath);
      } else if (["vue", "ts", "js", "json"].includes(fileType)) {
        const content = fs.readFileSync(filePath, "utf8");
        if (content.includes(oldText)) {
          const newContent = content.replace(new RegExp(oldText, "g"), newText);
          fs.writeFileSync(filePath, newContent, "utf8");
        }
      }
    }
  };
  searchFiles(srcPath);
};

/***
 * @description 多个文本全局替换
 * @returns
 */
export const multipleReplacement = (list: ITextReplacement[]) => {
  let count = 0;
  const total = list.length;
  vscode.window.showInformationMessage(`当前替换进度：${count}/${total}`);

  list.forEach((item) => {
    singleReplacement(item.oldText, item.newText);
    count++;
  });
};
