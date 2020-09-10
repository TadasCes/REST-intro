import { User } from './user'
import { UserList } from './userList'

export class UserUtil {
    static findUser(name: string): User | undefined {
        const result = UserList.list.find((u) => u.name === name)
        if (result === undefined) {
            console.log('User not found')
            return undefined
        } else {
            console.log('User' + JSON.stringify(result, null, 2))
            return result
        }
    }

    static AddPassword(user: User, password: string): void {
        user.password = password
    }

    static addEmail(user: User, email: string): void {
        user.email = email
    }

    static addFriend(user: User, friend: string): void {
        user.friendList.push(friend);
    }

    static areFriends(user: User, friend: string): boolean {
        if (user.friendList.find(fr => fr === friend) === undefined) {
            return false
        } else {
            return true
        }
    }
}
