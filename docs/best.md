# 最佳实践

这里汇总了使用 TypeScript 时的一些常见问题

### 使用严格模式

建议在 tsconfig.json 中启用所有严格的类型检查操作文件。这可能会导致 TypeScript 报告更多的错误，但也更有助于帮你提前发现发现程序中更多的 bug。

```json
// tsconfig.json
"strict": true
```

> 严格模式实际上就意味着：禁止隐式 any 和 严格的空检查。

为什么要使用严格模式？

严格模式**可以消除语法里一些不合理，不严谨的地方，可以让TS往更合理、更安全、更严谨的方向去发展**:

- 通过将一些TS的静默错误更改为抛出错误，消除了TS的一些静默错误，能更加有效保障代码运行的安全；
- 提高编译器效率，增加运行速度；
- 禁止一些可能在ECMAScript未来版本中定义的语法。

### 禁止隐式 any

在下面的函数中，TypeScript 已经推断出参数 a 是 any 类型的。当我们向该函数传递一个数字，并尝试打印一个 name 属性时，没有报错：

```ts
function logName(a) {
  // No error??
  console.log(a.name);
}

logName(97);
```

打开 noImplicitAny 选项后，如果我们没有显式地声明 a 的类型，TypeScript 将立即标记一个错误：

```ts
// ERROR: Parameter 'a' implicitly has an 'any' type.
function logName(a) {
  console.log(a.name);
}
```

### 严格的空检查

当 strictNullChecks 选项为 false 时，TypeScript 实际上会忽略 null 和 undefined。这可能会在运行时导致意外错误。

当 strictNullChecks 设置为 true 时，null 和 undefined 有它们自己的类型，如果你将它们分配给一个期望具体值(例如，字符串)的变量，则会得到一个类型错误。

```ts
let whoSangThis: string = getSong();

const singles = [
  { song: 'touch of grey', artist: 'grateful dead' },
  { song: 'paint it black', artist: 'rolling stones' },
];

const single = singles.find((s) => s.song === whoSangThis);

console.log(single.artist);
```

singles.find 并不能保证它一定能找到这首歌 — 但是我们已经编写了下面的代码，好像它肯定能找到一样。

通过将 strictNullChecks 设置为 true， TypeScript 将抛出一个错误，因为在尝试使用它之前，我们没有保证 single 一定存在：

```ts
const getSong = () => {
  return 'song';
};

let whoSangThis: string = getSong();

const singles = [
  { song: 'touch of grey', artist: 'grateful dead' },
  { song: 'paint it black', artist: 'rolling stones' },
];

const single = singles.find((s) => s.song === whoSangThis);

console.log(single.artist); // ERROR: Object is possibly 'undefined'.
```

TypeScript 基本上是告诉我们在使用 single 之前要确保它存在。我们需要先检查它是否为 null 或 undefined：

```ts
if (single) {
  console.log(single.artist); // rolling stones
}
```

### TypeScript 中的类型收窄

在 TypeScript 中，变量可以从不太精确的类型转移到更精确的类型，这个过程称为类型收窄。

下面是一个简单的例子，展示了当我们使用带有 typeof 的 if 语句时，TypeScript 如何将不太特定的 string | number 缩小到更特定的类型：

```ts
function addAnother(val: string | number) {
  if (typeof val === 'string') {
    // ts 将 val 视为一个字符串
    return val.concat(' ' + val);
  }

  // ts 知道 val 在这里是一个数字
  return val + val;
}

console.log(addAnother('哈哈')); // 哈哈 哈哈
console.log(addAnother(17)); // 34
```

另一个例子：下面，我们定义了一个名为 allVehicles 的联合类型，它可以是 Plane 或 Train 类型。

```ts
interface Vehicle {
  topSpeed: number;
}

interface Train extends Vehicle {
  carriages: number;
}

interface Plane extends Vehicle {
  wingSpan: number;
}

type PlaneOrTrain = Plane | Train;

function getSpeedRatio(v: PlaneOrTrain) {
  console.log(v.carriages); // ERROR: 'carriages' doesn't exist on type 'Plane'
}
```

由于 getSpeedRatio 函数处理了多种类型，我们需要一种方法来区分 v 是 Plane 还是 Train 。我们可以通过给这两种类型一个共同的区别属性来做到这一点，它带有一个字符串值:

```ts
interface Train extends Vehicle {
  type: 'Train';
  carriages: number;
}

interface Plane extends Vehicle {
  type: 'Plane';
  wingSpan: number;
}

type PlaneOrTrain = Plane | Train;
```

现在，TypeScript 可以缩小 v 的类型:

```ts
function getSpeedRatio(v: PlaneOrTrain) {
  if (v.type === 'Train') {
    return v.topSpeed / v.carriages;
  }

  // 如果不是 Train，ts 知道它就是 Plane 了，聪明！
  return v.topSpeed / v.wingSpan;
}

let bigTrain: Train = {
  type: 'Train',
  topSpeed: 100,
  carriages: 20,
};

console.log(getSpeedRatio(bigTrain)); // 5
```

另外，我们还可以通过实现一个类型保护来解决这个问题，可以看看这篇文章：[什么是鸭子🦆类型？](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247491151&idx=1&sn=82133b2bd5d073df4f06aa9d0dc69430&chksm=c2e2eb64f595627298b7e37727fe7b1c2a4eb1560308f6783a640b18f92de2f9b1194ed171db&token=2098632629&lang=zh_CN&scene=21#wechat_redirect)

### 使用 ?? 运算符

不要使用 `||` 确定默认值，应使用最新的 `??` 运算符或者最好是在参数级别定义默认值。

```ts
function createBlogPost(text: string, author: string, date: Date = new Date()) {
  return {
    text,
    author,
    date,
  }
}
```

`??` 与 `||` 不同，它只返回 `null` 或 `undefined`，而不是所有 falsy 值。

### 不要使用 any

在所有我们不确定类型的情况下，我们都应该使用 `unknown`。

```ts
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.xxx.com/products')
  const products: unknown = await response.json()
  return products as Product[]
}
```

为什么要这么做呢？

any 很简单，因为它从根本上禁用了所有类型检查。通常，即使在官方类型中也使用 any（例如，上面示例中的 response.json() 被 TypeScript 团队键入为 `Promise<any>`）。

为什么不能用any？

它从根本上禁用所有类型检查。通过 any 进入的所有值都将完全放弃任何类型检查。这可能会变得非常难以捕捉错误，因为只有当我们对类型结构的假设符合运行时代码时，代码才会失败。

### 类型守卫

强制告诉编译器它无法推断的类型

```ts
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.xxx.com/products')
  const products: unknown = await response.json()
  return products as Product[]
}
```

这就是类型守卫的用途。

```ts
function isArrayOfProfucts(obj: unknown): obj is Product[] {
  return Array.isArray(obj) && obj.every(isProduct)
}

function isProduct(obj: unknown): obj is Product {
  return obj != null
    && typeof (obj as Product).id === 'string'
}

async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.xxx.com/products')
  const products: unknown = await response.json()

  if (!isArrayOfProfucts(products)) {
    throw new TypeError('Received malformed products API response')
  }
  return products
}
```

当我们想要从 JavaScript 转换为 TypeScript 时，现有的代码库经常对 TypeScript 编译器无法自动得出的类型做出假设。在这些情况下，使用快速 as SomeOtherType 可以加快转换速度，而无需放松 tsconfig 中的设置。

即使现在可以保存断言，但当有人移动代码时，这可能会改变。类型保护将确保所有检查都是明确的。

### 避免可选属性

将属性定义为有时存在，有时不存在的可选属性。

```ts
interface Product {
  id: string;
  type: 'digital' | 'physical';
  weightInKg?: number;
  sizeInMb?: number;
}
```

清楚地表达，模型哪些组合存在，哪些不存在。

```ts
interface Product {
  id: string;
  type: 'digital' | 'physical';
}

interface DigitalProduct extends Product {
  type: 'digital';
  sizeInMb: number;
}

interface PhysicalProduct extends Product {
  type: 'physical';
  weightInKg: number;
}
```

将属性定义为可选而不是划分类型更容易并且生成的代码更少。它还需要对正在开发的产品有充分的了解，并且可以在对产品的假设发生变化时限制代码的使用。

类型系统的最大好处是它们可以用编译时检查代替运行时检查。通过更多的快速输入，可以在编译时检查可能被忽视的错误。

### 具体内容检测

经常有同学如下使用

```ts
function createMessage(countOfMessages?: number) {
  if (countOfMessages) {
  // if (!!countOfMessage) {
    return `You have ${countOfMessages} new messages`
  }
  return `Error: Could not retrieve number of new messages`
}
```

应该使用具体检查内容判断，判断更精准

```ts
function createMessage(countOfMessages?: number) {
  if (countOfMessages !== undefined) {
    return `You have ${countOfMessages} new messages`
  }
  return `Error: Could not retrieve number of new messages`
}
```

`!` 将任何值转换为布尔值的简便方法。尤其是在代码库中，假值（如 null、undefined 和“”）之间没有明确的语义分离。
