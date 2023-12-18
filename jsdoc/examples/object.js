// @ts-check
// 对象类型

/**
 * 定义了一个 Animal 类型，具有名称、年龄两个属性
 * @type {{ name: string, age: number }}
 */
var cat2 = { name: 'miao', age: 2 };



// 联合类型：适合于可能拥有多种类型之一的数据类型，该类型可以从提供的类型列表中确定
// 这是一个字符串类型/布尔类型
/**
 * 用来描述一个可能是 string 或 boolean 的类型
 * @type {(string | boolean)}
 */
var stringOrBoolean = '';
stringOrBoolean = false;

