import { UserUtil } from '../../user/userUtil'
import { User } from '../../user/user'

export class EmailController {
    static isEmailDefined(user: User): boolean {
        return user.email === undefined ? true : false
    }

    static isEmailValid(email: string): boolean {
        // pridet daugiau tikrinimu
        return email.length > 8 ? true : false
    }

    static isEmailNew(user: User, email: string): boolean {
        return user.email !== email ? true : false
        // always false **** sutvarkyt
    }
}
