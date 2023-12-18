

let ids: number[] = [1, 2, 3, 4, 5]; // 只能包含 number
let names: string[] = ['ConardLi', 'Tom', 'Jerry']; // 只能包含 string
let options: boolean[] = [true, false, false]; // 只能包含 true false
let books: object[] = [
  { name: 'Tom', animal: 'cat' },
  { name: 'Jerry', animal: 'mouse' },
]; // 只能包含对象

let arr: any[] = ['hello', 1, true]; // 啥都行，回到了 JS

ids.push(6);
ids.push('7'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'.



// 使用联合类型来定义包含多种类型的数组
let person: (string | number | boolean)[] = ['ConardLi', 1, true];
person[0] = 100;
person[1] = {name: 'ConardLi'} // Error - person array can't contain objects


// 如果数组有默认值，TypeScript 同样也会进行类型推断：
let person2 = ['ConardLi', 1, true]; // 和上面的例子一样
person2[0] = 100;
person2[1] = { name: 'ConardLi' }; // Error - person array can't contain objects



// TypeScript 中可以定义一种特殊类型的数组：元组（Tuple）。
// 元组是具有固定大小和已知数据类型的数组，它比常规数组更严格。
let person: [string, number, boolean] = ['ConardLi', 1, true];
person[0] = 17; // Error - Value at index 0 can only be a string

// 注意：元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。
// 例如，一个数组中可能有多种类型，数量和类型都不确定，那就直接 any[]。
