import express from 'express'
import bodyParser from 'body-parser'
import errorMiddleWare from './api/middleware'
import { User } from './user/user'
import { UserList } from './user/userList'
import { UserUtil } from './user/userUtil'
import { userRouter } from './api/routes/userRoutes'
import { passwordRouter } from './api/routes/passwordRoutes'
import { emailRouter } from './api/routes/emailRoutes'


// const petras = new User('Petras')
// UserUtil.AddPassword(petras, "asdasdasd")
// UserUtil.addEmail(petras, "paulius@gfmai.cos")

// const jonas = new User('Jonas')
// UserUtil.AddPassword(jonas, "asdasdasd")
// const paulius = new User('Paulius')
// UserUtil.addEmail(paulius, "paulius@gfmai.cos")

// UserUtil.addFriend(paulius, petras.name);
// UserUtil.addFriend(jonas, petras.name);

// UserList.addUser('jonas')
// UserList.addUser('petras')
// UserList.addUser('paulius')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(errorMiddleWare)
app.use("/", userRouter)
app.use("/", passwordRouter)
app.use("/", emailRouter)

app.listen(3000)
