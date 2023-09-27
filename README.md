# learn-typescript

- [json2ts](http://json2ts.com/)

TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

> 简而言之，TypeScript是JavaScript的超集，具有可选的类型并可以编译为纯JavaScript。从技术上讲TypeScript就是具有静态类型的 JavaScript。

1. 了解基本数据类型
2. 全面了解 `tsconfig`
3. 最佳实践

## 对比

1. `any` vs `unknown`
2. `interface` vs `type`

注意在键值语法中 KeyType 类型只能是 string、number、symbol 或则模板字面量, 不能是纯字面量

### unknown 与 any 的最大区别是

- any: 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。
- unknown: 任何类型的值都可以赋值给它，但它只能赋值给unknown和any

```ts
// 什么时候推荐用 type 什么时候用 interface ？

// 推荐任何时候都是用 type，type 使用起来更像一个变量，与 interface 相比，type 的特点如下：

// 表达功能更强大，不局限于 object/class/function
// 要扩展已有 type 需要创建新 type，不可以重名
// 支持更复杂的类型操作

// 基本上所有用 interface 表达的类型都有其等价的 type 表达。
// 在实践的过程中，我们也发现了一种类型只能用 interface 表达，无法用 type 表达，那就是往函数上挂载属性。

interface FuncWithAttachment {
  (param: string): boolean;
  someProperty: number;
}

const testFunc: FuncWithAttachment = {};
const result = testFunc('mike'); // 有类型提醒
testFunc.someProperty = 3; // 有类型提醒
```

## 配置说明

- TypeScript 严格模式 `"strict": true`
- 禁止隐式 any `noImplicitAny: true`
- 严格的空检查 `strictNullChecks: true`
- TypeScript 中的类型收窄
  - 变量可以从不太精确的类型转移到更精确的类型，这个过程称为类型收窄。

## 定义接口数据

```ts
// 在 Pro 推荐在 src/services/API.d.ts 中定义接口数据的类型，以用户基本信息为例：

declare namespace API {
  // 用户基本信息
  export type CurrentUser = {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  };
}

// 推荐 json2ts 等网站来自动转化。

// 在使用时我们就可以很简单的来使用, d.ts 结尾的文件会被 TypeScript 默认导入到全局，
// 但是其中不能使用 import 语法，如果需要引用需要使用三斜杠。
export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

// props
export type UserProps = {
  userInfo: API.CurrentUser;
};
```

## 参考文档

- https://github.com/TypeStrong/learn-typescript
- https://github.com/type-challenges/type-challenges
  - https://wangtunan.github.io/blog/typescript/challenge.html

### 其他文档

- 推荐:[TypeScript 基础类型](https://mp.weixin.qq.com/s/J3BM-Sb3okUy0-J_y7Fnzg)
  - [TypeScript 入门](https://juejin.cn/post/7018805943710253086)
- 入门:[TypeScript 终极初学者指南](https://mp.weixin.qq.com/s/PwfuaEa9OD9XxVHLZA1TtA)
- [Typescript 类型编程，从入门到念头通达](https://juejin.cn/post/7132490947320872974)
- [使用 TypeScript 的几个常见错误！](https://mp.weixin.qq.com/s/ud0LFGXv0K6hj_bYOSbnHA)
- [淘宝店铺 TypeScript 研发规约落地实践](https://mp.weixin.qq.com/s/a3OKOep9W7Cu81j7bKp3RQ)
- [神光的编程秘籍-typescript](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3OTYzMDkzMg==&action=getalbum&album_id=2150422842549633025&scene=173&from_msgid=2247489158&from_itemidx=1&count=3&nolastread=1#wechat_redirect)
  - [TypeScript 想更深入一层？我推荐自定义 transformer 的 compiler api](https://mp.weixin.qq.com/s/pudsFSvn87QyOT0NEaPVlA)
  - [模式匹配-让你 ts 类型体操水平暴增的套路](https://mp.weixin.qq.com/s/wLTCyRhXX3HQjvDSm7WgEQ)
  - [真实案例说明 TypeScript 类型体操的意义](https://mp.weixin.qq.com/s/vbjevGgIoniaV2fDnwlyXQ)
  - [几个一看就会的 TypeScript 小技巧](https://mp.weixin.qq.com/s/_70LnSTEhawjD-Gft_YiMQ)
- [手写一个 ts-node 来深入理解它的原理](https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247486703&idx=1&sn=a8d6bc078b234c70f20cd6e5a7db1837&chksm=cf00c3d4f8774ac2079ab3dd81f0334e40fe5f97c5c40a8e9e69da29d302c0a6de104d9978d4&scene=178&cur_album_id=2150422842549633025#rd)
- [TypeScript UML Playground](https://tsuml-demo.firebaseapp.com/)，一款在线 TypeScript UML 工具，利用它你可以为指定的 TypeScript 代码生成 UML 类图。
- JSON TO TS，一款 TypeScript 在线工具，利用它你可以为指定的 JSON 数据生成对应的 TypeScript 接口定义。
