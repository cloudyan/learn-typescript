{

  class Person {
    name: string;
    isCool: boolean;
    age: number;

    constructor(n: string, c: boolean, a: number) {
      this.name = n;
      this.isCool = c;
      this.age = a;
    }

    sayHello() {
      return `Hi，我是 ${this.name} ，我今年 ${this.age} 岁了`;
    }
  }

  const person1 = new Person('ConardLi', true, 17);
  const person2 = new Person('Jerry', 'yes', 20); // ERROR: Argument of type 'string' is not assignable to parameter of type 'boolean'.

  console.log(person1.sayHello()); // Hi, 我是 ConardLi，我今年 17 岁了



  // 创建一个仅包含从 Person 构造的对象数组
  let People: Person[] = [person1, person2];




  // 我们可以给类的属性添加访问修饰符，TypeScript 还提供了一个新的 readonly 访问修饰符。
  class Person2 {
    readonly name: string; // 不可以变的
    private isCool: boolean; // 类的私有属性、外部访问不到
    protected email: string; // 只能从这个类和子类中进行访问和修改
    public age: number; // 任何地方都可以访问和修改

    constructor(name: string, isCool: boolean, age: number) {
      this.name = name;
      this.isCool = isCool;
      this.age = age;
    }

    sayHello() {
      return `Hi，我是 ${this.name} ，我今年 ${this.age} 岁了`;
    }
  }

  const person3 = new Person2('ConardLi', true, 'conard@xx.com', 17);
  console.log(person1.name); // ConardLi
  person1.name = 'Jerry'; // Error: read only

  // 我们可以通过下面的写法，属性会在构造函数中自动分配，我们类会更加简洁：
  class Person3 {
    constructor(
      readonly name: string,
      private isCool: boolean,
      protected email: string,
      public age: number
    ) {}
  }

  // 如果我们省略访问修饰符，默认情况下属性都是 public，另外和 JavaScript 一样，类也是可以 extends 的。
}
