# 规则

- https://juejin.cn/post/7259562014417813564
- [TypeScript 中的元数据以及 reflect-metadata 实现原理分析](https://juejin.cn/post/7255561917682991163)

**不允许** 直接使用 `interface` `type` 来定义非装饰器参数和配置性参数之外其他 **任何数据类型**。

如何在前端优雅的面向对象

写过 `Java`、`SpringBoot`、`JPA` 等代码的后端程序员应该非常熟悉的一些概念：

- 抽象：万物都可抽象成相关的类和对象
- 面向对象：继承、封装、多态等特性的面向对象设计思维
- 切面：没有什么是切一刀解决不了的，如果一刀不行，那就多来几刀。
- 注解：没有什么常量是不能使用注解来配置的，也没有什么注解是切面想切还能躲得掉的
- 反射：没有什么是暴力拿取会失败的，即使失败也没有异常是丢不出来的
- 实体：没有什么是不能抽象到实体上的，万物皆唯一。
- 很多：还有很多，以上描述比较主观和随意。

## 抽象和面向对象

`Service` API 请求类

```ts
abstract class AbstractService{
  // 实现一个抽象属性 让子类们实现
  abstract baseUrl!: string

  // 再实现一些通用的 如增删改查之类的网络请求
  // save()

  // getDetail()

  // deleteById()

  // select()

  // page()

  // disabled()

  // ......
}
```

`Entity` 数据实体基类

```ts
abstract class AbstractBaseEntity<S extends AbstractService> {
  abstract service: AbstractService

  // 任何数据都是唯一的 ID
  id!: number

  // 再来实现一些数据实体的更新和删除方法
  save(){
    await service.save(this.toJson())
    Notify.success("新增成功")
  }

  delete(){
    service.deleteById(this.id)
    Notify.success("删除成功")
  }
  // ......
}
```

子类的实现

```ts
class UserEntity extends AbstractUserEntity<UserService>{
  service = new UserService()

  nickname!: string
  age!: number
  avatar?: string

  // 用户是否成年人
  isAdult(): boolean{
    return this.age >= 18
  }
}
```

`View` 视图调用

```vue
<template>
  <el-input v-model="user.nickname"/>
  <el-button @click="onUserSave()">创建用户</el-button>
</template>
<script setup lang="ts">
const user = ref(new UserEntity())
async function onUserSave(){
  await user.save()
}
</script>

```
