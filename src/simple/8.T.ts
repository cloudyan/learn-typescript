{

  // 泛型

  // <T> 只是一种编写习惯 - 我们也可以用 <X> 或 <A>
  const addID = <T>(obj: T) => {
    let id = Math.floor(Math.random() * 1000);

    return { ...obj, id };
  };

  // 这是啥意思呢？现在当我们再将一个对象传递给 addID 时，我们已经告诉 TypeScript 来捕获它的类型了 —— 所以 T 就变成了我们传入的任何类型。addID 现在会知道我们传入的对象上有哪些属性。


  // 但是，现在有另一个问题：任何东西都可以传入 addID ，TypeScript 将捕获类型而且并不会报告问题：

  let person1 = addID({ name: 'ConardLi', age: 17 });
  let person2 = addID('Jerry'); // 传递字符串也没问题

  console.log(person1.id); // 188
  console.log(person1.name); // ConardLi

  console.log(person2.id);
  console.log(person2.name); // ERROR: Property 'name' does not exist on type '"Jerry" & { id: number; }'.


  // 当我们传入一个字符串时，TypeScript 没有发现任何问题。只有我们尝试访问 name 属性时才会报告错误。
  // 所以，我们需要一个约束：我们需要通过将泛型类型 T 作为 object 的扩展，来告诉 TypeScript 只能接受对象:

  const addID2 = <T extends object>(obj: T) => {
    let id = Math.floor(Math.random() * 1000);

    return { ...obj, id };
  };

  let person3 = addID2({ name: 'John', age: 40 });
  let person4 = addID2('Jerry'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'object'.

  // 错误马上就被捕获了，完美…… 好吧，也不完全是。
  // 在 JavaScript 中，数组也是对象，所以我们仍然可以通过传入数组来逃避类型检查：
  let person5 = addID2(['ConardLi', 17]); // 传递数组没问题

  console.log(person5.id); // 188
  console.log(person5.name); // Error: Property 'name' does not exist on type '(string | number)[] & { id: number; }'.


  // 要解决这个问题，我们可以这样说：object 参数应该有一个带有字符串值的 name 属性：
  const addID3 = <T extends { name: string }>(obj: T) => {
    let id = Math.floor(Math.random() * 1000);

    return { ...obj, id };
  };

  let person6 = addID3(['ConardLi', 17]); // ERROR: argument should have a name property with string value

  // 泛型允许在参数和返回类型提前未知的组件中具有类型安全。

  // 在 TypeScript 中，泛型用于描述两个值之间的对应关系。
  // 在上面的例子中，返回类型与输入类型有关。我们用一个泛型来描述对应关系。

  // 另一个例子：如果需要接受多个类型的函数，最好使用泛型而不是 any。下面展示了使用 any 的问题：
  function logLength2(a: any) {
    console.log(a.length); // No error
    return a;
  }

  let hello = 'Hello world';
  logLength2(hello); // 11

  let howMany = 8;
  logLength2(howMany); // undefined (but no TypeScript error - surely we want TypeScript to tell us we've tried to access a length property on a number!)


  // 我们可以尝试使用泛型：有报错反馈，可以帮助我们持续改进代码
  function logLength3<T>(a: T) {
    console.log(a.length); // ERROR: TypeScript isn't certain that `a` is a value with a length property
    return a;
  }

  // 解决方案：使用一个泛型来扩展一个接口，确保传入的每个参数都有一个 length 属性：
  interface hasLength {
    length: number;
  }

  function logLength4<T extends hasLength>(a: T) {
    console.log(a.length);
    return a;
  }

  let hello = 'Hello world';
  logLength4(hello); // 11

  let howMany = 8;
  logLength4(howMany); // Error: numbers don't have length properties


  // 我们也可以编写这样一个函数，它的参数是一个元素数组，这些元素都有一个 length 属性：
  interface hasLength {
    length: number;
  }

  function logLengths<T extends hasLength>(a: T[]) {
    a.forEach((element) => {
      console.log(element.length);
    });
  }

  let arr = [
    'This string has a length prop',
    ['This', 'arr', 'has', 'length'],
    { material: 'plastic', length: 17 },
  ];

  logLengths(arr);
  // 29
  // 4
  // 30

}

{

  // 泛型接口
  // 当我们不知道对象中的某个值是什么类型时，可以使用泛型来传递该类型：
  // The type, T, will be passed in
  interface Person1<T> {
    name: string;
    age: number;
    documents: T;
  }

  // We have to pass in the type of `documents` - an array of strings in this case
  const person1: Person1<string[]> = {
    name: 'ConardLi',
    age: 17,
    documents: ['passport', 'bank statement', 'visa'],
  };

  // Again, we implement the `Person` interface, and pass in the type for documents - in this case a string
  const person2: Person1<string> = {
    name: 'Tom',
    age: 20,
    documents: 'passport, P45',
  };
}


  // 在业务代码中开发时我们并不推荐大家写泛型，但是为了得到更好的 typescript 体验我们可能需要了解一下常用组件库的泛型提示，这里做个简单列举。
  // 参见：https://pro.ant.design/zh-CN/docs/type-script


import type dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const dayjsFormat = (str: string | string[]) => {
  if (typeof str === 'string') {
    return dayjs(str);
  } else if (Array.isArray(str)) {
    return str.map(item => {
      return item && dayjs(item);
    });
  }
};

const defaultValue = dayjsFormat('2023-04-17')
const defaultValue2 = dayjsFormat(['2023-04-17', '2023-04-19'])

