
// 这里所说的对象类型，就是我们常说的函数、{}、数组、类
// 1. object 类型用于表示所有的非原始类型，即我们不能把 number、string、boolean、symbol等 原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。
// 2. 大 Object 代表所有拥有 toString、hasOwnProperty 方法的类型 所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 null 和 undefined 不可以)
// 3. {} 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合
// 4. 类 在 TypeScript 中，我们通过 Class 关键字来定义一个类
// 5. 函数 参见 function.ts
{
  // 使用特定的对象类型注释声明一个名为 person 的变量
  let person: {
    name: string;
    age: number;
    isProgrammer: boolean;
  };

  // 给 person 分配一个具有所有必要属性和值类型的对象
  person = {
    name: 'ConardLi',
    age: 17,
    isProgrammer: true,
  };

  person.age = '17'; // ERROR: should be a number

  person = {
    name: 'Tom',
    age: 3,
  };
  // ERROR: missing the isProgrammer property
}
