// https://www.typescriptlang.org/zh/play

{

type Person = {
  name: string;
  age: number;
}
// 结果：'name' | 'age'
type result = keyof Person


}
