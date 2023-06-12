//@ts-check
// 泛型


// 定义泛型 @template
// 这是JSDoc文档中没有提及的一种定义类型，只在[google closure compiler](https://github.com/google/closure-compiler/wiki/Generic-Types)中有提及，但是VS Code中有对应的支持：

/**
 * @param {T} x
 * @param {S} y
 * @template {number|string} T
 * @template {T} S
 */
function foo(x, y) {
  x = y;
}


/**
 * @template T
 * @param {T} obj
 * @param {(keyof T)[]} params
 */
function pluck(obj, ...params) {
  return params.map(el => obj[el])
}

// 对复杂的泛型有点难。内联泛型仍然使用 TypeScript 方式
/** @type { <T, K extends keyof T>(obj: T, params: K[]) => Array<T[K]>} */
// function values(obj, ...params) {
//   return params.map(el => obj[el])
// }
// const numbers = values(article, 'price', 'vat')
// const strings = values(article, 'title')
// const mixed = values(article, 'title', 'vat')

// 定义扩展泛型基类 @extends, @augments
// 参看官方文档的示例吧
// extends允许您在从基本 JavaScript 类扩展时指定通用参数
/**
 * @template T
 * @extends {Set<T>}
 */
class SortableSet extends Set {
  // ...
}


// @augments可以使泛型参数更具体
/**
 * @augments {Set<string>}
 */
class StringSet extends Set {
  // ...
}

// 需要注意的是 @extends, @augments 只能用来**定义基类的泛型参数，不能用来描述类的继承关系**：
class Animal {
  run() {

  }
}

/**
 * @extends {Animal}
 */
class Cat {
  run() {}
}

var cat = new Cat()
// 这里会没有代码提示
cat.run()
