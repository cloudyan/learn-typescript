# 问题

1. 一个对象，不止指定的属性，还有其他一些未知的属性？
2. window 上新增一个全局变量，怎么用 ts 约束？
3. 如何获取函数返回值的类型
4. 如何获取函数参数的类型
5. 如何支持运行时类型校验
6. 为什么要使用 d.ts

### 为什么要使用 d.ts

有时，我们不免会引入外部的 JS 库，这时 TS 就对引入的 JS 文件里变量的具体类型不明确了，为了告诉 TS 变量的类型，因此就有了.d.ts (d 即 declare)，ts 的声明文件。

“d.ts”文件用于为 TypeScript 提供有关用 JavaScript 编写的 API 的类型信息。简单讲，就是你可以在 ts 中调用的 js 的声明文件。TS 的核心在于静态类型，我们在编写 TS 的时候会定义很多的类型，但是主流的库都是 JS 编写的，并不支持类型系统。这个时候你不能用 TS 重写主流的库，这个时候我们只需要编写仅包含类型注释的 d.ts 文件，然后从您的 TS 代码中，可以在仍然使用纯 JS 库的同时，获得静态类型检查的 TS 优势。

### window 上新增全局变量

```ts
// index.d.ts
// 这是老方法，typescript 3.4 之后就废弃了
declare global {
  interface Window {
    __microApps__: [];
  }
}
```

新方法

```ts
// index.d.ts 声明文件
interface Window {
  __microApps__: []
}
```

无需配置文件即可

types 扩展知识

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    // 默认情况下，所有的 @types 包都会在编译时应用，任意层的 node_modules/@types 都会被使用
    // 如果你的类型定义不在这个文件夹中，可以使用 typesRoot 来配置，只有在 typeRoots 中的包才会被包含
    // 此时
    "typeRoots" : ["./typings"], // 现在，只有在 ./typings 中的才会应用，而 ./node_modules/@types 中的则不会
   // 如果配置了 types，则只有列出的包才会包含。
   "types" : ["node", "lodash", "express"],
   // 如果配置为"types": [] 则不会包含任何包。
  },
}
```

### 如何获取函数的返回值的类型？

- 如何获取函数返回值的类型
- 如何获取函数参数的类型

```ts
// 如何获取函数参数的类型？
// 示例函数
function test(lzwme: string, idx: number) {
  return {
    lzwme,
    idx,
  };
}

type TestArgsType = Parameters<typeof test>;
// TestArgsType => [lzwme: string, idx: number]

type TestArgsType1 = Parameters<typeof test>[1];
// TestArgsType1 => idx: number

// Parameters 定义实现
/**
 * Obtain the parameters of a function type in a tuple
 */
// @ts-ignore
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;


// 获取函数的返回值类型
type TestReturnType = ReturnType<typeof test>;


// ReturnType 定义实现 (lib.es5.d.ts 中)
/**
 * Obtain the return type of a function type
 */
// @ts-ignore
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type ValueType = ReturnType<() => 123> // 123
```

### 如何支持运行时类型校验

TypeScript 只在编译期执行静态类型检查！实际运行的是从 TypeScript 编译的 JavaScript，这些生成的 JavaScript 对类型一无所知。编译期静态类型检查在代码库内部能发挥很大作用，但对不合规范的输入（比如，从 API 处接收的输入）无能为力。

#### 运行时检查的严格性

- 至少需要和编译期检查一样严格，否则就失去了编译期检查提供的保证。
- 如有必要，可以比编译期检查更严格，例如，年龄需要大于等于 0。

解决方案

运行时类型检查策略

避免维护两份类型定义

1. 定制代码手动检查（比较麻烦）
2. 使用校验库手动检查
   1. schema 校验工具
   2. [joi](https://hapi.dev/module/joi) 老牌
   3. [zod](https://zod.dev/) 后起之秀
   4. [valibot](https://valibot.dev/) 号称小于 1kb 的 zod 替代品
3. 手动创建 JSON Schema
4. 自动创建 JSON Schema
   1. 基于 TypeScript 代码生成 JSON Schema
      1. [typescript-json-schema](https://github.com/YousefED/typescript-json-schema) 支持作为命令行工具使用和通过代码调用
   2. 基于 JSON 输入示例生成
5. 转译（静态==>运行时）
   1. 如 [ts-runtime](https://github.com/fabiandev/ts-runtime)
   2. 这种方式会将代码转译成功能上等价但内置运行时类型检查的代码
6. 运行时类型派生静态类型（运行时==>静态）
   1. 如 [io-ts](https://github.com/gcanti/io-ts)
   2. TypeScript 会根据我们定义的运行时类型推断出静态类型
7. 基于装饰器的类校验
   1. 如 [class-validator](https://github.com/typestack/class-validator) 基于类属性的装饰器
   2. 此类 Java EE 风格的库还有 typeorm
   3. class-validator 用于具体的类实例
   4. class-transformer 将普通输入转换为 Person 实例
