// 导出一个函数toJSON，用于将传入的obj对象转换为JSON字符串
export const toJSON = (obj: any) => JSON.stringify(obj, null, 2);
// 导出一个函数，将字符串转换为对象
export const json2Obj = (str: string) => JSON.parse(str);

// 导出一个函数isObject，用于判断传入的参数是否为对象
export const isObject = (obj: any) =>
  // 使用Object.prototype.toString.call()方法判断传入的参数的类型
  Object.prototype.toString.call(obj) === "[object Object]";
// 导出一个函数，用于判断传入的参数是否为字符串类型
export const isString = (str: any) => typeof str === "string";
// 导出一个函数，用于判断传入的参数是否为函数
export const isFunction = (fn: any) => typeof fn === "function";
// 导出一个函数，用于判断传入的参数是否为数字类型
export const isNumber = (num: any) => typeof num === "number";
// 导出一个函数，用于判断传入的参数是否为数组类型
export const isArray = (arr: any) => Array.isArray(arr);
// 导出一个函数，用于判断传入的参数是否为布尔类型
export const isBoolean = (bool: any) => typeof bool === "boolean";
// 导出一个函数，用于判断传入的参数是否为null
export const isNull = (nullObj: any) => nullObj === null;
// 导出一个函数，用于判断传入的参数是否为undefined
export const isUndefined = (undefinedObj: any) => undefinedObj === undefined;
// 导出一个函数，用于判断传入的参数是否为空对象
export const isEmptyObject = (obj: any) => {
  if (!isObject(obj)) return false;
  return Object.keys(obj).length === 0;
};
// 导出一个函数，用于判断传入的参数是否为空数组
export const isEmptyArray = (arr: any) => {
  if (!isArray(arr)) return false;
  return arr.length === 0;
};
// 导出一个函数，用于判断传入的参数是否为空字符串
export const isEmptyString = (str: any) => {
  if (!isString(str)) return false;
  return str.trim() === "";
};
// 导出一个函数，用于判断传入的参数是否为空值（null、undefined、空对象、空数组、空字符串）
export const isEmpty = (obj: any) => {
  if (isNull(obj) || isUndefined(obj)) return true;
  if (isObject(obj) && isEmptyObject(obj)) return true;
  if (isArray(obj) && isEmptyArray(obj)) return true;
  if (isString(obj) && isEmptyString(obj)) return true;
  return false;
};
