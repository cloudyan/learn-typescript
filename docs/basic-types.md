# 基础类型

`:type` 类型注释/类型签名

如果变量有默认值的话，一般我们也不需要显式声明类型，TypeScript  会自动推断变量的类型（类型推断）：

还可以将变量设置为联合类型（联合类型是可以分配多个类型的变量）

```ts
// 联合类型
let age: sting | number;
```

## 基础类型

```ts
// boolean
let isDone: boolean = false;


// number
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;


// string
let nameStr: string = 'bob';
nameStr = 'smith';

let nameStr2: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ nameStr2 }.

I'll be ${ age + 1 } years old next month.`;
let sentence2: string = "Hello, my name is " + name + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";
```

## 数组

```ts
// []
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let names: string[] = ['xiaosan', 'xiaosi', 'xiaowu'];
let options: boolean[] = [true, false];
let objArr: object[] = [
  {name: 'xiaosan', age: 18},
  {name: 'xiaowu', age: 18},
];
let arr: any[] = [1, 'hello', true] // 啥都行，同未设定

// 也可以使用联合类型定义包含多种类型的数组
let persion: (string | number | boolean)[] = []
```

如果数组有默认值，TypeScript 同样也会进行类型推断


```ts
// Tuple 元组
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error

console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'


x[3] = 'world'; // OK, 字符串可以赋值给 (string | number) 类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是 (string | number) 类型


// enum 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

enum Color2 {Red = 1, Green = 2, Blue = 4}
let c2: Color2 = Color2.Green;

enum Color3 {Red = 1, Green, Blue}
let colorName: string = Color3[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是 2


// any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```


```ts
// 其他
function sum(){
  let args:number[]=arguments; // 类型“IArguments”缺少类型“number[]”的以下属性：pop, push, concat, join 及其他 15 项。
  // 因为 arguments 不是数组，所以直接使用普通的数组方式来描述报错，而应该使用接口

  // 解决方案
  let args2: {
    [index:number]: number,
    length: number
    // collee: Function
  } = arguments

  // IArguments 是 TypeScript 中定义好的类型：
  let args3:IArguments = arguments
}
```
