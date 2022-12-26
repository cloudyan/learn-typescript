# 配置详细说明

参考文档

- [tsconfig 配置详解](https://juejin.cn/post/6844904093568221191)
- [由 allowSyntheticDefaultImports 引起的思考](https://blog.leodots.me/post/40-think-about-allowSyntheticDefaultImports.html)

tsconfig.json 是 TypeScript 项目的配置文件。

tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。


- [配置详细说明](#配置详细说明)
  - [tsc](#tsc)
  - [重要字段](#重要字段)
    - [tsconfig 配置](#tsconfig-配置)
  - [配置详解](#配置详解)
    - [rootDir](#rootdir)
    - [strict 模式详解](#strict-模式详解)
    - [模块解析baseUrl](#模块解析baseurl)
    - [路径映射(path)](#路径映射path)
    - [虚拟目录rootDirs](#虚拟目录rootdirs)

## tsc

- `tsc` 命名默认会编译整个项目所有的ts文件,但是也可以自己指定文件名, 例如 `tsc test.ts`
  - 编译的文件默认和源文件在同一文件夹下，这是因为tsc会结合tsconfig文件进行编译
- `tsc -w` watch模式监控当前项目ts文件变化立即进行编译
- `tsc --init` 初始化配置文件

> 当你使用tsc命令的时候, 后面没有任何参数才会使用tsconfig配置进行编译

- 不显式指定 `tsconfig.json` ，此时，编译器会从当前路径开始寻，直到找到`tsconfig.json`文件为止和require,import不写具体路径的查找规则差不多
- 通过 `--project` （或缩写 `-p` ）指定一个包含 `tsconfig.json` 的路径，和import,require写个相对路径差不多

## 重要字段

- `files`: 设置要编译的文件的名称
- `include`: 设置需要进行编译的文件，支持路径模式匹配
- `exclude`: 设置无需进行编译的文件，支持路径模式匹配
- `compilerOptions`: 设置与编译流程相关的选项

### tsconfig 配置

- `include` 可以和 `files` 联用
- `exclude` 只对 `include` 有效，对 `files` 无效
- 如果 `files` 和 `include` 都未设置，那么除了 `exclude` 排除的文件，编译器会默认包含路径下的所有 TS 文件

```json
{
  // 指定需要编译文件 否则默认当前目录下除了exclude之外的所有 .ts, .d.ts,.tsx 文件
  // files 适用于比较小型的项目，规定几个特定的文件
  "files": [],
  // 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件
  "inculde": [],
  // 不编译某些文件
  "exclude": [],
  // extends 可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置，继承来的文件的配置会覆盖当前文件定义的配置
  "extends": "./config/base",

  // 一个对象数组，指定要引用的项目
  // https://www.typescriptlang.org/docs/handbook/project-references.html
  "references": [],

  // compileOnSave的值是true或false，如果设为true，在我们编辑了项目中的文件保存的时候，编辑器会根据tsconfig.json中的配置重新生成文件，不过这个要编辑器支持
  "compileOnSave": true,

  // 编译的规则配置
  "compilerOptions": {

    // 只编译修改过的文件,这个时候会生成tsconfig.tsbuildinfo,下次编译的时候会进行对比只编译修改过的文件
    "incremental": true,



    /* 基本选项 */
    // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    // target 是编译成哪个版本的js
    "target": "es5",
    // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    // module 是模板生成的形式，默认情况下，当target是es3的时候，那module默认为commonjs形式，否则为es6形式。
    // 只有 amd 和 system 能和 outFile 一起使用，target 为 es5 或更低时可用 es6 和 es2015
    "module": "commonjs",
    /* 注意：如果未指定--lib，则会注入默认的librares列表。注入的默认库为：
       对于 --target ES5: DOM,ES5,ScriptHost
       对于 --target ES6: DOM,ES6,DOM.Iterable,ScriptHost
       TS 绝不会在您的代码中注入polyfill,所以需要你自己制定编译lib */
    // 指定要包含在编译中的库文件
    // 引入ES的功能库，比如想在项目中用js中Set，Map等新的数据结构，或promise等，那要在lib中引入es2015
    "lib": [],
    // 允许编译 javascript 文件
    "allowJs": true,
    // 报告 javascript 文件中的错误
    /* 是否检测JS的语法, 例如下面的语法编辑器会报错
       let name = 'paul';
       console.log(name.a.b) */
    "checkJs": true,
    // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "jsx": "preserve",
    /* 如果设为true，编译每个ts文件之后会生成一个js文件和一个声明文件,
       declaration 和 allowJs 不能同时设为 true */
    // 生成相应的 '.d.ts' 文件
    "declaration": true,
    // 值为true或false，指定是否为声明文件.d.ts生成map文件
    "declarationMap": true,
    // 用来指定编译时是否生成 .map 文件
    "sourceMap": true,
    // 当module设置为 'amd' and 'system'的时候可以使用此命令, 这样可以将ts文件打包到一个目录下
    // 将输出文件合并为一个文件
    "outFile": "./",
    // outDir 编译后的文件存到到哪个目录下, 默认是每一个ts文件的当前目录, 下面的配置就是把ts编译到build目录下
    // 指定输出目录
    "outDir": "./build",
    // 用来控制输出目录结构 --outDir (下面单独介绍)
    "rootDir": "./",
    // 是否编译构建引用项目, 很复杂后面介绍
    "composite": true,
    // 指定文件用来存储增量编译信息, 默认是 tsconfig.tsbuildinfo
    "tsBuildInfoFile": "./",
    // 编译的时候删除注释
    "removeComments": true,
    // 不生成编译文件，这个一般比较少用, 这个build目录下将没有任何文件, 但是会进行编译, 有错误会抛出
    "noEmit": true,
    // 是否引入npm包tslib中的辅助函数,__extends等
    // 从 tslib 导入辅助工具函数
    "importHelpers": true,
    // 当target为'ES5' or 'ES3'时，为'for-of', spread, and destructuring'中的迭代器提供完全支持
    "downlevelIteration": true,
    // isolatedModules 的值为true或false，指定是否将每个文件作为单独的模块，默认为true，它不可以和declaration同时设定
    // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）
    "isolatedModules": true,



    /* 严格的类型检查选项 */
    // 严格模式将会打开下面的几个选项(启用所有严格类型检查选项)
    "strict": true,
    /* 不允许变量或函数参数具有隐式any类型, 例如
      function(name) {
        return name;
      } */
    // 在表达式和声明上有隐含的 any类型时报错
    "noImplicitAny": true,
    // 启用严格的 null 类型检查, const teacher: string = null; 会报错
    "strictNullChecks": true,
    // 当 this 表达式值为 any 类型的时候，生成一个错误
    "noImplicitThis": true,
    // 对函数参数进行严格逆变比较
    "strictFunctionTypes": true,
    // 严格检查bind call apply
    "strictBindCallApply": true,
    // 此规则将验证构造函数内部初始化前后已定义的属性。
    "strictPropertyInitialization": true,
    // 检测this是否隐式指定
    "noImplicitThis": true,
    // 以严格模式检查每个模块，并在每个文件里加入 'use strict'
    // 使用js的严格模式,在每一个文件上部声明 use strict
    "alwaysStrict": true,

    /* 额外的检查 Additional Checks */
    // 默认false, 是否检测定义了但是没使用的变量
    // 有未使用的变量时，抛出错误
    "noUnusedLocals": true,
    // 用于检查是否有在函数体中没有使用的参数
    // 有未使用的参数时，抛出错误
    "noUnusedParameters": true,
    // 用于检查函数是否有返回值，设为true后，如果函数没有返回值则会提示
    // 并不是所有函数里的代码都有返回值时，抛出错误
    "noImplicitReturns": true,
    // 用于检查switch中是否有case没有使用break跳出switch
    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）
    "noFallthroughCasesInSwitch": true,



    /* 模块解析选项 Module Resolution Options */
    // 用于选择模块解析策略，有'node'和'classic'两种类型
    // 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "moduleResolution": "node",
    // 复杂的很 下面单独介绍这三个模块 baseUrl paths rootDirs
    // 用于解析非相对模块名称的基目录
    "baseUrl": "./",
    // 模块名到基于 baseUrl 的路径映射的列表
    "paths": {},
    // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "rootDirs": [],
    // typeRoots 用来指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载
    "typeRoots": [],
    // types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来
    "types": [],
    // 用来指定允许从没有默认导出的模块中默认导入（只检查的作用）
    "allowSyntheticDefaultImports": true,
    // 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
    // 这个字段只有当把代码编译成 commonJS 的时候才会起作用
    // 开启该字段，也会开启 allowSyntheticDefaultImports
    "esModuleInterop": true,
    // 不把符号链接解析为真实路径，具体可以了解下webpack和node.js的symlink相关知识
    "preserveSymlinks": true,
    "allowUmdGlobalAccess": true,



    /* Source Map Options */
    // sourceRoot 用于指定调试器应该找到TypeScript文件而不是源文件的位置，这个值会被写进.map文件里
    "sourceRoot": "./",
    // mapRoot 用于指定调试器找到映射文件而非生成文件的位置，指定map文件的根路径，该选项会影响.map文件中的sources属性
    "mapRoot": "./",
    // inlineSourceMap 指定是否将map文件内容和js文件编译在一个同一个js文件中，如果设为true, 则map的内容会以//#soureMappingURL=开头，然后接base64字符串的形式插入在js文件底部
    "inlineSourceMap": true,
    // inlineSources 用于指定是否进一步将ts文件的内容也包含到输出文件中, 要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
    "inlineSources": true,



    /* 其他选项 */
    // 用于指定是否启用实验性的装饰器特性
    "experimentalDecorators": true,
    // 用于指定是否为装饰器提供元数据支持
    // 关于元数据，也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引用ES2015.Reflect这个库
    "emitDecoratorMetadata": true

  }
}
```

## 配置详解

### rootDir

```js
// 假设我的目录结构如下
-- src
    version1
        test.ts
    version2
        demo.ts
// 如果我们设置 "rootDir": "./src",那么我们的编译后的文件结构如下,需要注意的是项目中除了src目录中,其他地方不能有ts文件了
--build
    version1
        test.ts
    version2
        demo.ts
```

### strict 模式详解

Typescript严格模式

- `noImplicitAny` 不允许变量或函数参数具有隐式`any`类型
- `noImplicitThis` 不允许`this`上下文隐式定义
- `strictNullChecks` 不允许出现`null`或`undefined`的可能性
- `strictPropertyInitialization` 验证构造函数内部初始化前后已定义的属性
- `strictBindCallApply` 对 `bind`, `call`, `apply` 更严格的类型检测
- `strictFunctionTypes` 对函数参数进行严格逆变比较。

`noImplicitAny` 不允许变量或函数参数具有隐式`any`类型

```ts
// Parameter 'name' implicitly has an 'any' type
function getName (name) {
    return name;
}
// 如果确定为name为any,也必须显式的制定
function getName1 (name: any) {
    return name;
}
```

**浏览器自带事件该如何处理？**

浏览器自带事件，比如e.preventDefault()，是阻止浏览器默认行为的关键代码。

这在Typescript 严格模式下是会报错的：

```ts
// Typescript 严格模式
function onChangeCheckbox (e) {
  //                    ❌ ^
  //                       Parameter 'e' implicitly
  //                       has an 'any' type. ts(7006)
  e.preventDefault()
  const value = e.target.checked
  validateCheckbox(value)
}
```

若需要正常使用这类Web API，就需要在全局定义扩展。比如：

```ts
// Typescript 严格模式
interface ChangeCheckboxEvent extends MouseEvent {
  target: HTMLInputElement
}

function onChangeCheckbox (e: ChangeCheckboxEvent) {
  e.preventDefault()
  const value = e.target.checked
  validateCheckbox(value)
}
```

**第三方库也需定义好类型**

请注意，如果导入了非Typescript库，这也会引发错误，因为导入的库的类型是any。


`noImplicitThis` 不允许`this`上下文隐式定义

```ts
// 不允许this上下文隐式定义
function uppercaseLabel () {
    // this 在函数上进行引用可能是不明确的
    return this.label.toUpperCase()
}

const config = {
    label: 'foo-config',
    uppercaseLabel,
}
config.uppercaseLabel();
```

解决该问题的一种方法是避免this在没有上下文的情况下使用函数

更好的方法是编写接口，定义所有类型，而不是Typescript来推断：

```ts
// 修改后的代码为
interface MyConfig {
    label: string
    uppercaseLabel: (params: void) => string
}

const config: MyConfig = {
    label: 'foo-config',
    uppercaseLabel () {
        return this.label.toUpperCase()
    }
}
```

`strictNullChecks` 不允许出现`null`或`undefined`的可能性

参看 严格的空检查

`strictPropertyInitialization` 验证构造函数内部初始化前后已定义的属性



```ts
// 此规则将验证构造函数内部初始化前后已定义的属性。
// 必须要确保每个实例的属性都有初始值，可以在构造函数里或者属性定义时赋值
// Property 'username' has no initializer and is not definitely assigned in the constructor.
class User {
  username: string;
  //    ❌  ^^^^^^
  //     Property 'username' has no initializer
  //     and is not definitely assigned in the constructor
}

const user = new User();
const username = user.username.toLowerCase();
//                 ❌         ^^^^^^^^^^^^
//          TypeError: Cannot read property 'toLowerCase' of undefined
```

解决方案有四种

1. 允许 `undefined`
2. 属性值显式初始化
3. 在构造函数中赋值
4. 显式赋值断言

```ts
// 方案 1: 允许 `undefined`
class User {
    private username: string | undefined;
}

const user = new User();

// 这样写，需要在使用时确保为 string 类型
const username = typeof user.username === "string"
  ? user.username.toLowerCase()
  : "n/a";


// 方案 2: 属性值显式初始化
class User {
  username = "n/a";
}

const user = new User();

// OK
const username = user.username.toLowerCase();


// 方案 3: 在构造函数中赋值
// 最有用的解决方案是向username构造函数添加参数，然后将其分配给username属性。
class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}

const user = new User("mariusschulz");

// OK
const username = user.username.toLowerCase();
// 还可以通过public修饰符进一步简化：
class User {
  constructor(public username: string) {}
}

const user = new User("mariusschulz");

// OK
const username = user.username.toLowerCase();


// 方案 4: 显式赋值断言
// 使用断言明确告诉TS我知道自己在干嘛
class User {
  username!: string;

  constructor(username: string) {
    this.initialize(username);
  }

  private initialize(username: string) {
    this.username = username;
  }
}

const user = new User("mariusschulz");

// OK
const username = user.username.toLowerCase();
```

`strictBindCallApply` 此规则将对 `bind`, `call`, `apply` 更严格的检测类型

```ts
/* 此函数在TS中会报错,Argument of type '[number, number, number]' is not
assignable to parameter of type '[number, number]'.
Types of property 'length' are incompatible */
// Typescript严格模式
function sum (num1: number, num2: number) {
  return num1 + num2
}

sum.apply(null, [1, 2, 3])
//           ❌ ^^^^^^^^^
//              Argument of type '[number, number, number]' is not
//              assignable to parameter of type '[number, number]'.
//                Types of property 'length' are incompatible.
//                  Type '3' is not assignable to type '2'. ts(2345)
```

解决方案: `...` 扩展运算符和`reduce`函数来处理

```ts
// 可以使用...运算符和reduce函数修改
// Typescript严格模式
function sum (...args: number[]) {
  return args.reduce<number>((total, num) => total + num, 0)
}

sum.apply(null, [1, 2, 3])
// 6
```

`strictFunctionTypes` 对函数参数进行严格逆变比较。

该规则将检查并限制函数类型参数是抗变（`contravariantly`）而非双变（`bivariantly`，即协变或抗变）的。

> 协变（covariance）和抗变（contravariance）是什么？
> [应该怎么理解编程语言中的协变逆变？](https://www.zhihu.com/question/38861374)
>
> 原理: 子类型可以隐性的转换为父类型

维基百科解释如下：

- **协变（covariant）**，如果它保持了子类型序关系≦。该序关系是：子类型≦基类型。
- **逆变（contravariant）**，如果它逆转了子类型序关系。

绝大部分的语言是允许协变的，也就是上面说的子类型可以默认转换为父类型，逆变一般是不被允许的（除了函数的参数）。

这一更严格的检查应用于除方法或构造函数声明以外的所有函数类型。方法被专门排除在外是为了确保带泛型的类和接口（如 Array ）总体上仍然保持协变。

```ts
// 该规则将检查并限制函数类型参数是逆变而非双变, 因为对于逆变类型的接口，TS是允许双变的
declare let f1: (x: Animal) => void;
declare let f2: (x: Dog) => void;
declare let f3: (x: Cat) => void;
f1 = f2;  // 启用 --strictFunctionTypes 时错误
f2 = f1;  // 正确
f2 = f3;  // 错误

interface Animal {
    Eat(): void
}

interface Dog extends Animal{
    Bark():void
}

interface Cat extends Animal{
    Meow():void
}
```

1. 第一个赋值语句在默认的类型检查模式中是允许的，但是在严格函数类型模式下会被标记错误。
2. 而严格函数类型模式将它标记为错误，因为它不能 被证明合理。
3. 任何一种模式中，第三个赋值都是错误的，因为它 永远不合理。

用另一种方式来描述这个例子则是，默认类型检查模式中 `T`在类型 `(x: T) => void`是双变的，但在严格函数类型模式中 `T`是抗变的

```ts
interface Comparer<T> {
    compare: (a: T, b: T) => number;
}

declare let animalComparer: Comparer<Animal>;
declare let dogComparer: Comparer<Dog>;

animalComparer = dogComparer;  // 启用 --strictFunctionTypes 时错误
dogComparer = animalComparer;  // 正确
```

### 模块解析baseUrl

```js
// 假设我们路径如下, 此时我们在test.ts中引用 `import test2 from '../test2'`,
-- src
    version1
        test.ts
    version2
        demo.ts
    test2.ts

// 如果我们设置 "baseUrl": "./src" 那么我们在ts中引入test2可以写为
// 需要注意的是只有我们引用的是绝对路径的时候才会使用baseUrl去解析文件
import test2 from 'test2',
```

> 如果用了webpack使用了alias, 那么导致baseUrl不会生效，从而paths也不会生效，所以paths岂不是没用了吗？
> 其实从实际作用来说确实是没用了，不过可以将paths的配置和alias配置成一样的，在vscode中会有路径的自动提示，也是很方便很爽的

### 路径映射(path)

path是相对于baseUrl更复杂的路径映射

```js
// 如果我们tsconfig使用如下配置
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": [
        "*",
        "version2/*"
      ]
    }
}
// 我们的项目目录如下, 此时我们在test.ts中引用 import test2 from 'test2',
// 首先匹配 baseUrl/test2 如果找到则停止否则开始寻找 baseUrl/version2/test2
-- src
    version1
        test.ts
    version2
        demo.ts
    test2.ts
```


### 虚拟目录rootDirs

```ts
// 如果我们tsconfig使用如下配置, 这个时候我们生成了一个虚拟的根目录,这个根目录下存放了version2,version3目录下文件
{
  "compilerOptions": {
    "rootDirs": [
      "src/version2",
      "src/version3",
    ],
  }
}

// 我们的项目目录如下,此时我们在test.ts中引用demo就可以这样使用了 import demo from './demo',
-- src
    version1
        test.ts
    version2
        demo.ts
    test2.ts
```
