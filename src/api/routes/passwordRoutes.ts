import express from "express"
import { UserUtil } from '../../user/userUtil'
import { PasswordController } from '../controllers/passwordController'
import HttpException from '../exceptions/exception'

export const passwordRouter = express.Router();

passwordRouter.put(
    '/users/add-password/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.name) {
            const user = UserUtil.findUser(req.body.name)
            if (user) {
                if (PasswordController.isPasswordNew(user, req.body.password1)) {
                    if (req.body.password1 && req.body.password2) {
                        const validation = PasswordController.passwordValidation(
                            req.body.password1,
                            req.body.password2
                        )
                        if (validation.length > 0) {
                            next(new HttpException(400, validation))
                            return
                        } else {
                            UserUtil.AddPassword(user, req.body.password1)
                            res.status(200).json({
                                status: 200,
                                message: 'Password added',
                            })
                        }
                    }
                }
            } else {
                next(new HttpException(404, 'User not found'))
                return
            }
        } else {
            next(new HttpException(400, "User's name not provided"))
            return
        }
    }
)