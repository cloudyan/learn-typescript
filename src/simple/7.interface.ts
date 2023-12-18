// 接口定义了对象的外观

interface Person {
  name: string;
  age: number;
}

function sayHi(person: Person) {
  console.log(`Hi ${person.name}`);
}

sayHi({
  name: 'ConardLi',
  age: 17,
}); // Hi ConardLi




// 还可以使用类型别名定义对象类型：
type Person = {
  name: string;
  age: number;
};

// 或者可以直接匿名定义对象类型：
function sayHi(person: { name: string; age: number }) {
  console.log(`Hi ${person.name}`);
}



// interface 和 type 非常相似，很多情况下它俩可以随便用。比如它们两个都可以扩展：

// 扩展 interface
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear: Bear = {
  name: "Winnie",
  honey: true,
}

// 扩展 type
type Animal1 = {
  name: string
}

type Bear1 = Animal & {
  honey: boolean
}

const bear1: Bear = {
  name: "Winnie",
  honey: true,
}


// 但是有个比较明显的区别，interface 是可以自动合并类型的，但是 type 不支持

interface Animal {
  name: string
}

interface Animal {
  tail: boolean
}

const dog: Animal = {
  name: "Tom",
  tail: true,
}

// 类型别名在创建后无法更改：
type Animal = {
  name: string
}

type Animal = {
  tail: boolean
}
// ERROR: Duplicate identifier 'Animal'.


// 一般来说，当你不知道用啥的时候，默认就用 interface 就行，直到 interface 满足不了我们的需求的时候再用 type。





// 类的 interface
interface HasFormatter {
  format(): string;
}

class Person implements HasFormatter {
  constructor(public username: string, protected password: string) {}

  format() {
    return this.username.toLocaleLowerCase();
  }
}

let person1: HasFormatter;
let person2: HasFormatter;

person1 = new Person('ConardLi', 'admin123');
person2 = new Person('Tom', 'admin123');

console.log(person1.format()); // conardli

// 确保 people 是一个实现 HasFormatter 的对象数组 (确保每 people 都有 format 方法):
let people: HasFormatter[] = [];
people.push(person1);
people.push(person2);
