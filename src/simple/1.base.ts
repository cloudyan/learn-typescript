
let name = 'ConardLi';
name.toLowerCase();
console.log(name); // ConardLi - 字符串的方法并没有改变字符串本身

let arr = [1, 3, 5, 7];
arr.pop();
console.log(arr); // [1, 3, 5] - 数组的方法改变了数组



// 变量有默认值的话，一般我们也不需要显式声明类型，TypeScript  会自动推断变量的类型（类型推断）
// let id: number = 5;
// let firstname: string = 'ConardLi'; //
// let hasDog: boolean = true;

let unit: number; // 声明变量而不赋值
unit = 5;

let id = 5; // number 类型
let firstname = 'ConardLi'; // string 类型
let hasDog = true; // boolean 类型

hasDog = 'yes'; // ERROR



// 联合类型（联合类型是可以分配多个类型的变量）
let age: string | number;
age = 17;
age = '17';


