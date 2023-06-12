function justLog(): void {
    console.log('这个函数的返回值类型为 void')
}

function notReturn() {
    return
}

interface IUser {
    name: string;
    // nickName: string;
    printName: () => void
}

// 属性“nickName”在类型“UserMan”中是私有属性，但在类型“IUser”中不是。
class UserMan implements IUser {
    name: string = 'Bella'
    // 这是私有字段
    private nickName: string = 'hu'
    printName() {
        console.log(this.name)
        // return undefined
    }
}
