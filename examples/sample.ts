// import type { User } from './sample.type'


export type User = {
  name: string
  age: number
}

// mock api response
const res = {
};

// user
// const { user = {} }: { user: User } = res;
// fixd: 改 User interface 为 type
// const { user = {} }: { user?: User | {} } = res;
// 如果老接口 res 不仅仅 user
const { user }: { user?: User, [prop: string]: any } = res;

// 使用
console.log(user?.name && 'hello')
