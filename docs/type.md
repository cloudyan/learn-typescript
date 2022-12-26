# 类型

- [类型](#类型)
  - [TypeScript 基础类型](#typescript-基础类型)
    - [Boolean 类型](#boolean-类型)
    - [Number 类型](#number-类型)
    - [String 类型](#string-类型)
    - [Enum 类型](#enum-类型)
    - [Array 类型](#array-类型)
    - [元组（tuple）类型](#元组tuple类型)
    - [undefined 和 null](#undefined-和-null)
    - [any 类型](#any-类型)
    - [void 类型](#void-类型)
    - [never 类型](#never-类型)
    - [Unknown 类型](#unknown-类型)
    - [对象类型](#对象类型)
      - [object, Object 和 {} 类型](#object-object-和--类型)
      - [函数](#函数)
    - [类型推论](#类型推论)
    - [类型断言](#类型断言)
    - [非空断言](#非空断言)
    - [确定赋值断言](#确定赋值断言)
    - [联合类型](#联合类型)
    - [类型别名](#类型别名)
    - [交叉类型](#交叉类型)
    - [类型守卫](#类型守卫)
    - [接口](#接口)
    - [泛型](#泛型)
    - [内置工具](#内置工具)


## TypeScript 基础类型

- 类型系统
- 元组 `tuple`
- 联合类型
- 接口 `interface`
- 类型别名 `type`
- 泛型 `<T>`
- 枚举 `enum`

```ts
// 八种内置类型
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me");
```

### Boolean 类型

### Number 类型

### String 类型

### Enum 类型

### Array 类型

### 元组（tuple）类型

### undefined 和 null

### any 类型

### void 类型

void 意思就是无效的, 一般只用在函数上，告诉别人这个函数没有返回值。

> 默认情况下 null 和 undefined 是所有类型的子类型。也就是说你可以把 null 和 undefined 赋值给其他类型。
> 如果你在tsconfig.json指定了"strictNullChecks":true ，即开启严格模式后，null 和 undefined 只能赋值给 void 和它们各自的类型。

### never 类型

never 类型表示的是那些永不存在的值的类型。例如never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

值会永不存在的[两种情况](./src/typesystem/never.ts)：

1. 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）
2. 函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。

### Unknown 类型

### 对象类型

#### object, Object 和 {} 类型

#### 函数

### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论的规则推断出一个类型。

而如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

### 类型断言

某些情况下，我们可能比typescript更加清楚的知道某个变量的类型，所以我们可能希望手动指定一个值的类型

类型断言有两种方式

1. 尖括号写法

    ```ts
    let str: any = "to be or not to be";
    let strLength: number = (<string>str).length;
    ```

2. as 写法

    ```ts
    let str: any = "to be or not to be";
    let strLength: number = (str as string).length;
    ```

### 非空断言

在上下文中当类型检查器无法断定类型时，可以使用缀表达式操作符 ! 进行断言操作对象是非 null 和非 undefined 的类型，**即x!的值不会为 null 或 undefined**

```ts
let user: string | null | undefined;
console.log(user!.toUpperCase()); // 编译正确
console.log(user.toUpperCase());  // 错误
```

### 确定赋值断言

```ts
let value:number
console.log(value); // Variable 'value' is used before being assigned.
```

我们定义了变量, 没有赋值就使用，则会报错

通过 let x!: number; 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。

```ts
let value!:number
console.log(value); // undefined 编译正确
```

### 联合类型

联合类型用|分隔，表示取值可以为多种类型中的一种

```ts
let status:string|number
status='to be or not to be'
status=1
```

### 类型别名

类型别名用来给一个类型起个新名字。它只是起了一个新名字，并没有创建新类型。类型别名常用于联合类型。

```ts
type count = number | number[];
function hello(value: count) {}
```

### 交叉类型

交叉类型就是跟联合类型相反，用&操作符表示，交叉类型就是两个类型必须存在

```ts
interface IpersonA{
  name: string,
  age: number
}
interface IpersonB {
  name: string,
  gender: string
}

let person: IpersonA & IpersonB = {
  name: "师爷",
  age: 18,
  gender: "男"
};
```

person 既是 IpersonA 类型，又是 IpersonB 类型

> 注意：交叉类型取的多个类型的并集，但是如果key相同但是类型不同，则该key为never类型

```ts
interface IpersonA {
  name: string
}

interface IpersonB {
  name: number
}

function testAndFn(params: IpersonA & IpersonB) {
  console.log(params)
}

testAndFn({name: "黄老爷"}) // error TS2322: Type 'string' is not assignable to type 'never'.
```

### 类型守卫


### 接口


### 泛型


### 内置工具
