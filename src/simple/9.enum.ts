
// 枚举允许我们定义或声明一组相关值，可以是数字或字符串，作为一组命名常量。

enum ResourceType {
  BOOK,
  AUTHOR,
  FILM,
  DIRECTOR,
  PERSON,
}

console.log(ResourceType.BOOK); // 0
console.log(ResourceType.AUTHOR); // 1

// 从 2 开始
enum ResourceType2 {
  BOOK = 2,
  AUTHOR,
  FILM,
  DIRECTOR,
  PERSON,
}

console.log(ResourceType2.BOOK); // 2
console.log(ResourceType2.AUTHOR); // 3



// 默认情况下，枚举是基于数字的 — 它们将字符串值存储为数字。但它们也可以是字符串：
enum Direction {
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
  Left = 'Left',
}

console.log(Direction.Right); // Right
console.log(Direction.Down); // Down

// 当我们有一组相关的常量时，枚举就可以派上用场了。例如，与在代码中使用非描述性数字不同，枚举通过描述性常量使代码更具可读性。

// 枚举还可以防止错误，因为当你输入枚举的名称时，智能提示将弹出可能选择的选项列表。




// 常量枚举
const enum Color {
  RED,
  BLUE,
  GREEN,
}

const color: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
console.log(color); // [0, 1, 2]

//编译之后的js如下：
// var color = [0 /* RED */, 1 /* PINK */, 2 /* BLUE */];
// 可以看到我们的枚举并没有被编译成js代码 只是把color这个数组变量编译出来了
