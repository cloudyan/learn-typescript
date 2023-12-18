// @ts-check
// @typedef 允许您从任何其他 .js 或 .ts 文件导入类型。这样，您就可以在 TypeScript 中编写 TypeScript 类型定义，并将它们导入源文件中。

// The following line imports the Article type from article.ts and makes it
// available under Article
/** @typedef { import('./lib/article').Article } MyArticle */

/** @type {MyArticle} */
const myArticle = {
  title: 'The best book in the world',
  price: 10,
  vat: 0.2
}

// 或

/** @type {import('./lib/article').Article} */
const article = {
  title: 'The best book in the world',
  price: 10,
  vat: 0.2
}
