import { User } from './user'
import { UserUtil } from './userUtil'

export class UserList {
    static list: User[] = []

    static addUser(user: User): void {
        if (UserUtil.findUser(user.name) === undefined) {
            this.list.push(user)
        } else {
            throw Error('User already created')
        }
    }

    static deleteUser(user: User): void {
        if (UserUtil.findUser(user.name) !== undefined) {
            this.list.splice(this.list.indexOf(user), 1)
        } else {
            throw Error('No such user')
        }
    }

}
