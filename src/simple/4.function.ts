
// 继 object
// 5. 函数
//   5.1 函数声明
//   5.2 函数表达式
//   5.3 接口定义函数
//   5.4 可选参数，默认参数，剩余参数
//   5.5 函数重载


// 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。
// 注意: 函数重载真正执行的是同名函数最后定义的函数体，在最后一个函数体定义之前全都属于函数类型定义，不能写具体的函数实现方法，只能定义类型


// 定义一个名为 circle 的函数，它接受一个类型为 number 的直径变量，并返回一个字符串
function circle(diam: number): string {
  return '圆的周长为：' + Math.PI * diam;
}

console.log(circle(10)); // 圆的周长为：31.41592653589793



// ES6 箭头函数
const circle6 = (diam: number): string => {
  return '圆的周长为：' + Math.PI * diam;
};



// 参数是联合类型
const add = (a: number, b: number, c?: number | string) => {
  console.log(c);
  return a + b;
};

console.log(add(5, 4, '可以是 number、string，也可以为空'));



// 如果函数没有返回值，在 TS 里表示为返回 void，你也不需要显式声明，TS 一样可以进行类型推断：
const log = (msg: string): void => {
  console.log('打印一些内容: ' + msg);
};
