// @ts-check
// 基本类型

// 定义数组类型的三种方式

/**
 * 定义字符串数组类型
 * @type {Array<string>}
 */
var strArr = ['1', '2'];

//  以下是另外两种方式，作用和第一种一样
/**
 * @type {Array.<string>}
 */
/**
 * @type {string[]}
 */



/**
 * 定义 boolean 类型
 * @type {boolean}
 */
var isSelected = false;



/**
 * 定义 string 类型
 * @type {string}
 */
var strName = 'xyz';



// TypeScript 中添加的类型

/**
 * 这是 TypeScript 定义的 Navigator 类型
 * @type {Navigator}
 */
var navigator;

/**
 * 这是 TypeScript 定义的窗口类型
 * @type {Window}
 */
var win;

/**
 * 这是 TypeScript 定义的 HTML 元素类型
 * @type {HTMLElement}
 */
var rootElement = document.getElementById('root');
