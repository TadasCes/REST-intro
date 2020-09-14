import express from 'express'
import { UserUtil } from '../../user/userUtil'
import { UserList } from '../../user/userList'
import HttpException from '../exceptions/exception'
import { User } from '../../user/user'

export const userRouter = express.Router()

userRouter.post(
    '/users/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.name) {
            if (req.body.name.length < 3) {
                next(new HttpException(400, "User's name must have at least 3 characters"))
                return
            } else if (req.body.name.length > 30) {
                next(new HttpException(400, "User's name is too long (max - 30 characters)"))
                return
            } else if (typeof req.body.name !== 'string') {
                next(new HttpException(400, 'Invalid name'))
                return
            } else if (UserUtil.findUser(req.body.name)) {
                next(new HttpException(400, 'User already exists'))
                return
            } else {
                UserList.addUser(req.body.name)
                res.status(200).json({
                    status: 200,
                    message: "User '" + req.body.name + "' created successfully",
                })
            }
        } else {
            next(new HttpException(400, "User's name not provided"))
            return
        }
    }
)

userRouter.delete('/users/:name', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.params.name) {
        const user = UserUtil.findUser(req.params.name)
        if (user === undefined) {
            next(new HttpException(404, "User not found"))
            return
        } else {
            UserList.deleteUser(user)
            res.status(200).json({
                status: 200,
                message: 'User deleted',
            })
        }
    } else {
        next(new HttpException(400, "Please provide user name"))
        return
    }
})

userRouter.put('/users/add-friend', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.body.name) {
        const user = UserUtil.findUser(req.body.name)
        if (user !== undefined) {
            if (req.body.friend) {
                const friend = UserUtil.findUser(req.body.friend)
                if (friend !== undefined) {
                    if (!UserUtil.areFriends(user, friend.name)) {
                        UserUtil.addFriend(user, friend.name);
                        UserUtil.addFriend(friend, user.name);
                        res.status(200).json({
                            status: 200,
                            message: 'Friend added',
                        })
                    } else {
                        next(new HttpException(404, "Users are already friends"))
                        return
                    }
                } else {
                    next(new HttpException(404, "User not found"))
                    return
                }
            } else {
                next(new HttpException(400, "Please provide friend name"))
                return
            }
        } else {
            next(new HttpException(404, "User not found"))
            return
        }
    } else {
        next(new HttpException(400, "Please provide user name"))
        return
    }
})

userRouter.get('/users/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (UserList.list) {
        res.json(UserList.list)
    } else {
        next(new HttpException(404, "There are no users"))
        return
    }
})

userRouter.get('/users/:name', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = UserUtil.findUser(req.params.name)
    if (user) {
        res.json(user)
    } else {
        next(new HttpException(404, "User not found"))
        return
    }
})