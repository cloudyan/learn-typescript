// 给 Window 增加参数
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
}

// 全局变量，比如通过 define 注入的参数
declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

// src/typings.d.ts
// ... 代码省略
declare const REACT_APP_ENV: 'test' | 'dev' | 'uat' | 'prod' | undefined;
// 以下变量声明对应 config.[env].ts 文件内 define 的变量
declare const API_URL: string;
declare const API_SECRET_KEY: string;

// 某个库不存在类型定义
declare module 'xxx';


// 忽略语法

// @ts-ignore
// xxxx;
// as unknown
// as XXX
