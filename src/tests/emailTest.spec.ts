import { User } from '../user/user'
import { UserUtil } from '../user/userUtil'
import { PasswordController } from '../api/controllers/passwordController'
import { EmailController } from '../api/controllers/emailController'
import { UserList } from '../user/userList'

describe('Email', () => {
    const user = new User('vardenis')

    beforeEach(() => {
        UserList.addUser(user)
    })

    afterEach(() => {
        UserList.deleteUser(user)
    })

    test('Add email ', () => {
        UserUtil.addEmail(user, 'alio@alio123.com')
        expect(user.email).toEqual('alio@alio123.com')
    })

    test('Is email defined, true ', () => {
        UserUtil.addEmail(user, 'alio@alio123.com')
        expect(EmailController.isEmailDefined(user)).toEqual(true)

    })

    test('Is email defined, false ', () => {
        const u = new User('pavardenis')
        UserList.addUser(u)
        expect(EmailController.isEmailDefined(u)).toEqual(false)
    })

    test('Is email valid, true ', () => {
        expect(EmailController.isEmailValid("alio@alio1234.com")).toEqual(true)
    })

    test('Is email valid, false ', () => {
        expect(EmailController.isEmailValid("o@al.com")).toEqual(false)
    })

    test('Is email new, true ', () => {
        expect(EmailController.isEmailNew(user, "alio@alio1234.com")).toEqual(true)
    })

    test('Is email new, false ', () => {
        expect(EmailController.isEmailNew(user, "alio@alio123.com")).toEqual(false)
    })
})
