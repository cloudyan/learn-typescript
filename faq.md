# 问题

1. 一个对象，不止指定的属性，还有其他一些未知的属性?
2. window 上新增一个全局变量，怎么用 ts 约束?
3. 如何获取函数返回值的类型?
4. 如何获取函数参数的类型？


```ts
// 如何获取函数返回值的类型
type Bar = string;
type foo = () => Bar;
type baz = ReturnType<foo>;

```

```ts
// 如何获取函数参数的类型？
// 示例函数
function test(lzwme: string, idx: number) {
  return {
    lzwme,
    idx,
  };
}

type TestArgsType = Parameters<typeof test>;
// TestArgsType => [lzwme: string, idx: number]

type TestArgsType1 = Parameters<typeof test>[1];
// TestArgsType1 => idx: number

// Parameters 定义实现
/**
 * Obtain the parameters of a function type in a tuple
 */
// @ts-ignore
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;


// 获取函数的返回值类型
type TestReturnType = ReturnType<typeof test>;


// ReturnType 定义实现 (lib.es5.d.ts 中)
/**
 * Obtain the return type of a function type
 */
// @ts-ignore
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type ValueType = ReturnType<() => 123> // 123
```
