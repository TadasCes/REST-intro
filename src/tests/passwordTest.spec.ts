import { User } from '../user/user'
import { UserUtil } from '../user/userUtil'
import { PasswordController } from '../api/controllers/passwordController'
import { UserList } from '../user/userList'

describe('Password', () => {
    const user = new User('vardenis')

    test('Add password ', () => {
        UserUtil.addPassword(user, 'alioalio123')
        expect(user.password).toEqual('alioalio123')
    })

    test('Password validation, correct', () => {
        expect(PasswordController.passwordValidation('Abcde123123', 'Abcde123123')).toEqual('')
    })

    test('Password validation, too short', () => {
        expect(PasswordController.passwordValidation('a', 'a')).toEqual(
            'Password must be longer than 8 symbols.'
        )
    })

    test('Password validation, too long', () => {
        expect(
            PasswordController.passwordValidation(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            )
        ).toEqual('Password must be shorter than 50 symbols.')
    })

    test('Password validation, no digit', () => {
        expect(PasswordController.passwordValidation('Abcdeabcdasd', 'Abcdeabcdasd')).toEqual(
            'Password must have at least one digit.'
        )
    })

    test('Password validation, no lower case', () => {
        expect(PasswordController.passwordValidation('ABCDASDASDAD1', 'ABCDASDASDAD1')).toEqual(
            'Password must have at least one lower case letter.'
        )
    })

    test('Password validation, no upper case', () => {
        expect(PasswordController.passwordValidation('asdasdasdasd1', 'asdasdasdasd1')).toEqual(
            'Password must have at least one upper case letter.'
        )
    })

    test('Password validation, no digit, no upper case', () => {
        expect(PasswordController.passwordValidation('sdasdasdasd', 'sdasdasdasd')).toEqual(
            'Password must have at least one digit. Password must have at least one upper case letter.'
        )
    })

    test('Password validation, no digit, no lower case', () => {
        expect(PasswordController.passwordValidation('ASDASDASDASD', 'ASDASDASDASD')).toEqual(
            'Password must have at least one digit. Password must have at least one lower case letter.'
        )
    })

    test('Password validation, no upper case, no lower case', () => {
        expect(PasswordController.passwordValidation('123123123123', '123123123123')).toEqual(
            'Password must have at least one lower case letter. Password must have at least one upper case letter.'
        )
    })

    test('Password validation, must match', () => {
        expect(PasswordController.passwordValidation('aA123123123123', 'asd')).toEqual(
            'Passwords must match.'
        )
    })

    test('Password change, new password', () => {
        expect(PasswordController.isPasswordNew(user, 'aA1231231278873123')).toEqual(true)
    })

    test('Password change, same password', () => {
        const u = new User('pavardenis')
        UserList.addUser(u)
        UserUtil.addPassword(u, 'Alioalio123')
        expect(PasswordController.isPasswordNew(u, 'Alioalio123')).toEqual(false)
        UserList.deleteUser(u)
    })

    test('Password change, no password set', () => {
        const usr = new User('useruser')
        UserList.addUser(usr)
        expect(PasswordController.isPasswordNew(usr, 'Alioalio123')).toEqual(false)
        UserList.deleteUser(usr)
    })
})
