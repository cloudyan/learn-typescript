// @ts-check
// 函数类型


/**
 * 用闭包的形式来定义函数类型
 * @type {function(string, boolean): number}
 */
var function1;


/**
 * 用 TypeScript 的语法来定义函数类型
 * @type {(s: string, b: boolean) => number}
 */
var function2;


/**
 * 使用内置的 Function 类型，不指定参数和返回值
 * @type {Function}
 */
var function3;



/**
 * @typedef {Object} Article2
 * @property {number} price
 * @property {number} vat
 * @property {string} string
 * @property {boolean=} sold
 */

/**
 * Now we can use Article2 as a proper type
 * @param {[Article2]} articles
 */
function totalAmount(articles) {
  return articles.reduce((total, article) => {
    return total + addVAT(article)
  }, 0)
}

/**
 * @param {object} article
 * @return {number}
 */
function addVAT(article) {
  return article.price
}

/**
 * @param {string} url
 * @param {(status: number, response?: string) => void} cb
 * 函数也能够在内联中被定义，但这很快就会变得非常混乱。
 * 可以使用 `@callback` 修改
 */
function loadData(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.onload = () => {
    cb(xhr.status, xhr.responseText)
  }
}



/**
 * @callback LoadingCallback
 * @param {number} status
 * @param {string=} response
 * @returns {void}
 */

/**
 * @param {string} url
 * @param {LoadingCallback} cb
 */
function loadData(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.onload = () => {
    cb(xhr.status, xhr.responseText)
  }
}


// typeof 也可用
/**
 * @param {number} status The status code as a number
 * @param {string} data The data to work with
 */
function defaultCallback(status, data) {
  if(status === 200) {
    document.body.innerHTML = data
  }
}

/**
 * @param {string} url the URL to load data from
 * @param {typeof defaultCallback} cb what to do afterwards
 */
function loadData2(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.onload = () => {
    cb(xhr.status, xhr.responseText)
  }
}
