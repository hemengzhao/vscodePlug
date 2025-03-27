import * as vscode from "vscode";
export const JudgeFileType = (file: File) => {
  const { name } = file;
  const fileType = name.split(".").pop();
  return fileType;
};

/***
 * @description 获取激活文件的信息
 * @returns
 */
export const getActivationFileInfo = () => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const filePath = document.fileName;
    const fileType = filePath.split(".").pop(); // 获取文件类型
    const fileContent = document.getText(); // 获取文件内容

    return { filePath, fileType, fileContent };
  } else {
    vscode.window.showInformationMessage("没有激活的文本编辑器。");
  }
};
