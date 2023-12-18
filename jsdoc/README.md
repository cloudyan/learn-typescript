# 基于 TypeScript 的 JSDoc 注释

JSDoc 使用 TS 声明文件提供智能提示

## 用法

参看 examples 示例

```ts
// @ts-check
// js 文件开头，使用上面这个注释，开启 TS 支持

// 那么接下来，使用命令：
// tsc --declaration src/lib/service.js --allowJs
// npx -p typescript tsc src/**.js --declaration --allowJs --emitDeclarationOnly --outDir types
// -p 是 npx 的命令，原名--package，具体请看官网 https://docs.npmjs.com/cli/v8/commands/npx
// `src/**/*.js`: 对 src 目录下的所有 js 文件生成.d.ts 文件
// `--declaration`: 生成相应的.d.ts 文件
// `--allowJs`: 允许编译 javascript 文件
// `--emitDeclarationOnly`: 只输出 .d.ts 文件，不输出 JavaScript 文件
// `--outDir`: 输出到指定的目录
// 就可以根据你所写的 JSDoc，为你的 service.js 文件生成 .d.ts 文件了


// VS Code 编辑器通过 jsconfig.js（ts 项目是 tsconfig.js）对 JavaScript 项目提供支持 type-checking-javascript-files

// 不要忘记正确的注释语法。使用 // 的内联注释不起作用。

// npx -p typescript tsc jsdoc/examples/**.js --declaration --target es2015 --allowJs --emitDeclarationOnly --outDir dist/types
```

## 参考文档

- [基于 TypeScript 的 JSDoc 注释](https://juejin.cn/post/6844903706006126599)
- [JSDoc 使用 TS 声明文件提供智能提示](https://betgar.github.io/2019/11/29/jsdoc-with-ts-declaration/)
- JSDoc 官网
  - [JSDoc 官网](https://jsdoc.app/about-getting-started.html)
  - [JSDoc block-tags](https://jsdoc.app/#block-tags)
- TS 官网
  - [TS 支持的 JSDoc 类型](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
  - [演练场示例 - JSDoc Support](https://www.typescriptlang.org/zh/play#example/jsdoc-support)
  - [JavaScript 文件类型检查](https://www.tslang.cn/docs/handbook/type-checking-javascript-files.html)
- [Annotating JavaScript for the Closure Compiler](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler)
