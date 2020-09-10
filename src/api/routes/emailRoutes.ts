import express from 'express'
import { UserUtil } from '../../user/userUtil'
import { EmailController } from '../controllers/emailController'
import HttpException from '../exceptions/exception'

export const emailRouter = express.Router()

emailRouter.put(
    '/users/add-email/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.name) {
            const user = UserUtil.findUser(req.body.name)
            if (user) {
                if (!EmailController.isEmailDefined(req.body.name)) {
                    next(new HttpException(400, 'Email already defined'))
                    return
                } else {
                    if (EmailController.isEmailValid(req.body.email)) {
                        next(new HttpException(400, 'Email already defined'))
                        return
                    } else {
                        UserUtil.addEmail(user, req.body.email)
                        res.status(200).json({
                            status: 200,
                            message: 'Email added',
                        })
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

emailRouter.patch(
    '/users/change-email/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.name) {
            const user = UserUtil.findUser(req.body.name)
            if (user) {
                if (!EmailController.isEmailValid(req.body.email)) {
                    next(new HttpException(400, 'Email invalid'))
                    return
                } else {
                    if (EmailController.isEmailNew(user, req.body.email)) {
                        next(new HttpException(400, 'Email must be new'))
                        return
                    } else {
                        UserUtil.addEmail(user, req.body.email)
                        res.status(200).json({
                            status: 200,
                            message: 'Email added',
                        })
                    }
                }
            } else {
                next(new HttpException(400, 'User not found'))
                return
            }
        } else {
            next(new HttpException(400, "Please provide user's name"))
            return
        }
    }
)
