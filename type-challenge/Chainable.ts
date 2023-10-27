type Expected = {
  foo: number
  bar: {
    value: string
  }
  name: string
}
declare const obj: Chainable<{}>

// 结果：Expected
const result = obj
  .options('foo', 123)
  .options('bar', { value: 'Hello' })
  .options('name', 'TypeScript')
  .get()

type Chainable<T> = {
  options<K extends string, V>(key: K, value: V): Chainable<T & {[k in K]: V}>
  get(): T
}
