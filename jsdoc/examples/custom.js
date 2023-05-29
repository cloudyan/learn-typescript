// @ts-check
// 自定义类型和属性 @typedef 和 @property, @prop
// 1. 如果要创建一些在JSDoc中使用的复杂类型，就需要用@typedef去定义了这个类型
// 2. 然后使用@property或@prop去定义类型的属性。
// 3. 定义完成后，通过@type去使用自行定义的类型：

/**
 * @typedef {object} Animal2 这是自定义的Animal类型
 * @property {string} name 复杂类型的一个string类型属性
 * @property {number} age 复杂类型的一个number类型属性
 * @prop {boolean} [hasOwner] 复杂类型的一个boolean类型属性，可选
 * @property {string[]=} toys 复杂类型的一个string数组属性，可选
 * @prop {string} [ownerName='xyz'] 复杂类型的一个string类型属性，默认值为xyz, 可选
 *
 */

/**
 * @type {Animal2}
 */
var animal = { name: 'miao', age: 2, hasOwner: false }



// 定义回调函数 @callback
// @callback类似于@typedef，区别在于：
// @typedef定义的是对象类型，包括函数类型，
// 而@callback定义的是函数类型。

/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */

/**
 * @type {Predicate}
 */
const ok = s => !(s.length % 2);



// 定义函数参数和返回值 @param, @arg, @arguments 和 @return
// - @param/@arg/@arguments用来定义函数参数，使用了和@type相同的类型语法
// - @return用来定义函数的返回值。关于参数的定义方式和@typedef相似。

/**
 * @param {string}  name - string类型参数
 * @param {string=} age - 可选参数，number类型
 * @param {number} [hasOwner] - 可选参数，number类型
 * @param {string} [ownerName="xyz"] - 带默认值的可选参数
 * @return {string} 这是返回值
 */
function getAnimal(name, age, hasOwner, ownerName){
  // TODO
  return ''
}
