# learn-typescript

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

## 配置说明

- TypeScript 严格模式 `"strict": true`
- 禁止隐式 any `noImplicitAny: true`
- 严格的空检查 `strictNullChecks: true`
- TypeScript 中的类型收窄
  - 变量可以从不太精确的类型转移到更精确的类型，这个过程称为类型收窄。

## 参考文档

- https://github.com/TypeStrong/learn-typescript
- https://github.com/type-challenges/type-challenges
  - https://wangtunan.github.io/blog/typescript/challenge.html

### 其他文档

- 推荐:[TypeScript 基础类型](https://mp.weixin.qq.com/s/J3BM-Sb3okUy0-J_y7Fnzg)
  - [TypeScript 入门](https://juejin.cn/post/7018805943710253086)
- 入门:[TypeScript 终极初学者指南](https://mp.weixin.qq.com/s/PwfuaEa9OD9XxVHLZA1TtA)
- [使用 TypeScript 的几个常见错误！](https://mp.weixin.qq.com/s/ud0LFGXv0K6hj_bYOSbnHA)
- [淘宝店铺 TypeScript 研发规约落地实践](https://mp.weixin.qq.com/s/a3OKOep9W7Cu81j7bKp3RQ)
- [神光的编程秘籍-typescript](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3OTYzMDkzMg==&action=getalbum&album_id=2150422842549633025&scene=173&from_msgid=2247489158&from_itemidx=1&count=3&nolastread=1#wechat_redirect)
  - [TypeScript 想更深入一层？我推荐自定义 transformer 的 compiler api](https://mp.weixin.qq.com/s/pudsFSvn87QyOT0NEaPVlA)
  - [模式匹配-让你 ts 类型体操水平暴增的套路](https://mp.weixin.qq.com/s/wLTCyRhXX3HQjvDSm7WgEQ)
  - [真实案例说明 TypeScript 类型体操的意义](https://mp.weixin.qq.com/s/vbjevGgIoniaV2fDnwlyXQ)
  - [几个一看就会的 TypeScript 小技巧](https://mp.weixin.qq.com/s/_70LnSTEhawjD-Gft_YiMQ)
- [手写一个 ts-node 来深入理解它的原理](https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247486703&idx=1&sn=a8d6bc078b234c70f20cd6e5a7db1837&chksm=cf00c3d4f8774ac2079ab3dd81f0334e40fe5f97c5c40a8e9e69da29d302c0a6de104d9978d4&scene=178&cur_album_id=2150422842549633025#rd)
