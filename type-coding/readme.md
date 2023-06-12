# 类型编程

[Typescript 类型编程，从入门到念头通达](https://juejin.cn/post/7132490947320872974)

```ts
type IsSub = SubType extends ParentType ? true : false; // IsSub 的类型值为 true
```

### 获取类型所有属性 key

想要知道对象有哪些属性，可以使用 keyof 关键词。例如：

```ts
interface Person2 {
  name: string;
  age: number;
}

type Keys = keyof Person2; // 返回属性的联合联合类型

// 箭头函数类型和空对象没有 key。
type F = () => void;
type K = keyof F; // never;
type Foo = keyof {}; // never;
```

## 条件语句

TS 类型编程中并没有其他语言中的 if/else 语法，而是使用了三元运算符 `X extends Y ? expr1 : expr2`。

- `X extends Y` − 判断 X 是否为 Y 的子类型
- `expr1` − 如果 X 是 Y 的子类型，则返回该值
- `expr2` − 如果 X 不是 Y 的子类型，则返回该值

```ts
type A = 1 extends number ? 1 : never; // 1
type IsRed = 'blue' extends 'red' ? true : false; // false
```

## 内置泛型工具

```ts
type Person = {
  name: string;
  age: number;
  id: number;
}

// Pick 挑选出指定属性，生成新对象类型
type UserInfo = Pick<Person, 'name' | 'age'>;
// 挑选出 { name: string; age: number }


// Omit 排除指定的属性，生成新的对象类型
type UserInfo2 = Omit<Person, 'id'>;
// 排除 id，生成  { name: string; age: number }


// Partial 将对象所有属性变为可选
type PartialPerson = Partial<Person>;
// { name?: string; age?: number; id?: number }


// Readonly 将对象所有属性变为只读
type ReadonlyPerson = Readonly<Person>;
// { readonly name: string; readonly age: number; readonly id: number }


// Record 生成对象类型，例如
type PersonMap = Record<number, Person>;
// { [index: number]: Person }


// Exclude 排除一些联合类型
type UserInfoKeys = Exclude<keyof Person, 'id'>;
// 'name' | 'age'
```
