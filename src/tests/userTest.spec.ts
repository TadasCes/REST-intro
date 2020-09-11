import { UserList } from '../user/userList'
import { User } from '../user/user'
import { UserUtil } from '../user/userUtil'

describe('User', () => {
    const user = new User('vardenis')

    test('Add user ', () => {
        UserList.addUser(user)
        expect(UserList.list).toContainEqual(user)
        UserList.deleteUser(user)
    })

    test('Add user (user already added)', () => {
        UserList.addUser(user)
        expect(() => {
            UserList.addUser(user)
        }).toThrow(Error)
        UserList.deleteUser(user)
    })

    test('Delete user', () => {
        UserList.addUser(user)
        UserList.deleteUser(user)
        expect(UserList.list).toEqual(expect.not.objectContaining(user))
    })

    test('Delete user (no user)', () => {
        expect(() => {
            UserList.deleteUser(user)
        }).toThrow(Error)
    })

    test('Find user', () => {
        UserList.addUser(user)
        expect(UserUtil.findUser(user.name)).toEqual(user)
        UserList.deleteUser(user)
    })

    test('Find user (undefined)', () => {
        expect(UserUtil.findUser(user.name)).toEqual(undefined)
    })

    test('Add friend', () => {
        UserUtil.addFriend(user, "pavardenis")
        expect(user.friendList).toContain("pavardenis")
    })

    test('Are friend, true', () => {
        expect(UserUtil.areFriends(user, "pavardenis")).toEqual(true);
    })

    test('Are friend, false', () => {
        expect(UserUtil.areFriends(user, "joniene")).toEqual(false);
    })
})
