// @ts-check
// 定义 this 指向 @this
// - VS Code可以帮我们做一些类型推断。但是有一些场景没法很好的做出推断，通过使用@this可以帮助我们来显式指定 this 的类型。

/**
 * @this {HTMLElement}
 */
function getScrollbarWidth() {
  return this.offsetWidth - this.scrollWidth
}

// 其他
// @type 关于Nullable和Non-nullable
// - JSDoc中关于@type有 Nullable Type 和 Non-nullable Type 的概念，
// - 但是在TypeScript中只允许根据 strictNullChecks 标记类型为是否可以为null，
// - 并不能通过显示标注 non-nullablity 来实现和JSDoc的一致

/**
 * 在JSDoc中标记为可能为number或null类型
 * @type {?number}
 */

/**
 * 在JSDoc中标记为number类型，并且不可能为null类型
 * @type {!number}
 */

/**
  * 以上两种写法，在TypeScript下都等价于如下
  * @type {number}
  */



// 在TypeScript中导入其他文件中的定义
// 这是在TypeScript中独有的，JSDoc并不支持

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


