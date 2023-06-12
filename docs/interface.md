# 接口

接口定义了对象的外观

- 定义对象的类型时，我们通常会使用 interface
- 还可以使用类型别名定义对象类型
- 也可以直接匿名定义对象类型

## interface vs type

### 扩展

扩展 interface

```ts
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
```

扩展 type

```ts
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}

const bear: Bear = {
  name: "Winnie",
  honey: true,
}
```

interface 是可以自动合并类型的，但是 type 不支持

```ts
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

```

一般来说，当你不知道用啥的时候，默认就用 interface 就行，直到 interface 满足不了我们的需求的时候再用 type。


## 泛型实践

示例 1

```ts
const addID = (obj: object) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person1 = addID({ name: 'John', age: 40 });

console.log(person1.id); // 271
console.log(person1.name); // ERROR: Property 'name' does not exist on type '{ id: number; }'.
```

解决方案

```ts
// const addID = <T extends object>(obj: T) => { // array 也是 object
const addID = <T extends { name: string }>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person2 = addID(['ConardLi', 17]); // ERROR: argument should have a name property with string value
```

示例 2

```ts
function logLength(a: any) {
  console.log(a.length); // No error
  return a;
}

let hello = 'Hello world';
logLength(hello); // 11

let howMany = 8;
logLength(howMany); // undefined (but no TypeScript error - surely we want TypeScript to tell us we've tried to access a length property on a number!)
```

解决方案

```ts
interface hasLength {
  length: number;
}

function logLength<T extends hasLength>(a: T) {
  console.log(a.length);
  return a;
}

let hello = 'Hello world';
logLength(hello); // 11

let howMany = 8;
logLength(howMany); // Error: numbers don't have length properties

// 其他场景
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
```

## 泛型接口

```ts
// The type, T, will be passed in
interface Person<T> {
  name: string;
  age: number;
  documents: T;
}

// We have to pass in the type of `documents` - an array of strings in this case
const person1: Person<string[]> = {
  name: 'ConardLi',
  age: 17,
  documents: ['passport', 'bank statement', 'visa'],
};

// Again, we implement the `Person` interface, and pass in the type for documents - in this case a string
const person2: Person<string> = {
  name: 'Tom',
  age: 20,
  documents: 'passport, P45',
};
```

## 一些注意事项

- number 就可以赋值给 {}、Object 类型，但是不能赋值给 object 类型
- 使用 `Record<string, any>` 代替 `object`
