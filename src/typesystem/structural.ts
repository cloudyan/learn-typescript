class Dog {
    name: string
    constructor(name: string) {
        this.name = name
    }
    getName() {
        return this.name
    }
}

class PersonMan {
    name: string
    constructor(name: string) {
        this.name = name
    }
    getName() {
        return this.name
    }
}

const bella = new PersonMan('bella')
const hua = new Dog('hua')

function getName(p: Dog) {
    return p.getName()
}

console.log(getName(bella))
console.log(getName(hua))
