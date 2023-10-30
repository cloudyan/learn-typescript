# 类型

https://juejin.cn/post/6872111128135073806

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
      - [`Partial<Type>`](#partialtype)
      - [`Required<Type>`](#requiredtype)
      - [`Readonly<Type>`](#readonlytype)
      - [`Record<Keys, Type>`](#recordkeys-type)
      - [`Exclude<UnionType, ExcludedMembers>`](#excludeuniontype-excludedmembers)
      - [`Extract<Type, Union>`](#extracttype-union)
      - [`Pick<Type, Keys>`](#picktype-keys)
      - [`Omit<Type, Keys>`](#omittype-keys)
      - [`NonNullable<Type>`](#nonnullabletype)
      - [`Parameters<Type>`](#parameterstype)
      - [`ReturnType<Type>`](#returntypetype)
      - [字符串类型工具](#字符串类型工具)
      - [`Uppercase<StringType>`](#uppercasestringtype)
      - [`Lowercase<StringType>`](#lowercasestringtype)


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
> 如果你在tsconfig.json指定了 `"strictNullChecks":true`, 即开启严格模式后，null 和 undefined 只能赋值给 void 和它们各自的类型。

### never 类型

never 类型表示的是那些永不存在的值的类型。例如never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

值会永不存在的[两种情况](./src/typesystem/never.ts)：

1. 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）
2. 函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。

### Unknown 类型

unknown与any一样，所有类型都可以分配给unknown:

unknown与any的最大区别是：

任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any

### 对象类型

#### object, Object 和 {} 类型

1. `object` 用于表示非原始类型，即我们不能把 number、string、boolean、symbol 等原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。
2. 大 `Object` 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 null 和 undefined 不可以)
3. `{}` 空对象类型和大 Object 一样，也是表示原始类型和非原始类型的集合

#### 函数



### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论的规则推断出一个类型。

而如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

### 类型断言

某些情况下，我们可能比typescript更加清楚的知道某个变量的类型，所以我们可能希望手动指定一个值的类型

类型断言有两种形式

1. 尖括号语法

    ```ts
    let str: any = "to be or not to be";
    let strLength: number = (<string>str).length;
    ```

2. as 语法

    ```ts
    let str: any = "to be or not to be";
    let strLength: number = (str as string).length;
    ```

    有时为什么需要两次 as 断言

    `expr as T`

    expr 是实际的值，T是类型断言，它们必须满足下面的条件：expr是T的子类型，或者T是expr的子类型。

    也就是说，类型断言要求实际的类型与断言的类型兼容，实际类型可以断言为一个更加宽泛的类型（父类型），也可以断言为一个更加精确的类型（子类型），但不能断言为一个完全无关的类型。

    但是，如果真的要断言成一个完全无关的类型，也是可以做到的。那就是连续进行两次类型断言，先断言成 unknown 类型或 any 类型，然后再断言为目标类型。因为any类型和unknown类型是所有其他类型的父类型，所以可以作为两种完全无关的类型的中介。

    ```ts
    // 或者写成 <T><unknown>expr
    expr as unknown as T
    ```

    上面代码中，expr连续进行了两次类型断言，第一次断言为unknown类型，第二次断言为T类型。这样的话，expr就可以断言成任意类型T，而不报错。

    下面是本小节开头那个例子的改写。

    ```ts
    const n = 1;
    const m:string = n as unknown as string; // 正确
    ```

    上面示例中，通过两次类型断言，变量n的类型就从数值，变成了完全无关的字符串，从而赋值时不会报错。

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

通过 `let x!: number;` 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。

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

TypeScript 内置了17个类型工具，可以直接使用。

- `Awaited<Type>`
- `ConstructorParameters<Type>`
- `Exclude<UnionType, ExcludedMembers>`
- `Extract<Type, Union>`
- `InstanceType<Type>`
- `NonNullable<Type>`
- `Omit<Type, Keys>`
- `OmitThisParameter<Type>`
- `Parameters<Type>`
- `Partial<Type>`
- `Pick<Type, Keys>`
- `Readonly<Type>`
- `Record<Keys, Type>`
- `Required<Type>`
- `ReadonlyArray<Type>`
- `ReturnType<Type>`
- `ThisParameterType<Type>`
- `ThisType<Type>`
- `字符串类型工具`
  - `Uppercase<StringType>`
  - `Lowercase<StringType>`
  - `Capitalize<StringType>`
  - `Uncapitalize<StringType>`

#### `Partial<Type>`
#### `Required<Type>`
#### `Readonly<Type>`
#### `Record<Keys, Type>`
#### `Exclude<UnionType, ExcludedMembers>`
#### `Extract<Type, Union>`
#### `Pick<Type, Keys>`
#### `Omit<Type, Keys>`
#### `NonNullable<Type>`
#### `Parameters<Type>`
#### `ReturnType<Type>`

#### 字符串类型工具

#### `Uppercase<StringType>`
#### `Lowercase<StringType>`
