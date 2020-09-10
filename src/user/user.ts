export class User {
    name: string
    password: string | undefined
    email: string | undefined
    age: number | undefined
    job: string | undefined
    city: string | undefined
    friendList: string[] = []

    constructor(name: string) {
        this.name = name
    }
}
