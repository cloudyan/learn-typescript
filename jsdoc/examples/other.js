// @ts-check
// 定义 this 指向 @this
// - VS Code 可以帮我们做一些类型推断。但是有一些场景没法很好的做出推断，通过使用@this 可以帮助我们来显式指定 this 的类型。

/**
 * @this {HTMLElement}
 */
function getScrollbarWidth() {
  return this.offsetWidth - this.scrollWidth
}

// 其他
// @type 关于 Nullable 和 Non-nullable
// - JSDoc 中关于@type 有 Nullable Type 和 Non-nullable Type 的概念，
// - 但是在 TypeScript 中只允许根据 strictNullChecks 标记类型为是否可以为 null，
// - 并不能通过显示标注 non-nullablity 来实现和 JSDoc 的一致

/**
 * 在 JSDoc 中标记为可能为 number 或 null 类型
 * @type {?number}
 */

/**
 * 在 JSDoc 中标记为 number 类型，并且不可能为 null 类型
 * @type {!number}
 */

/**
  * 以上两种写法，在 TypeScript 下都等价于如下
  * @type {number}
  */



// 在 TypeScript 中导入其他文件中的定义
// 这是在 TypeScript 中独有的，JSDoc 并不支持

// b.js
/**
 * @param p {import('./lib/a').Pet}
 */
function walk(p) {
  console.log(`${p.name} is walking!`)
}

// 也可以给引入的类型起别名
/**
 * @typedef { import('./lib/a').Pet } MyPet
 *
/**
 * @type {MyPet}
 */
var mimi = { name: 'mimi' }


