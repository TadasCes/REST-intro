import { User } from "./user/user";
import { UserList } from "./user/userList";
import { UserUtil } from "./user/userUtil";
import express from "express";
import bodyParser from "body-parser";

const petras = new User("Petras");
petras.createPassword("automobilis", "automobilis");
petras.addEmail("petras@gmail.com");
petras.addInfo(48, "stalius", "Birzai");
UserList.addUser("petras");

const jonas = new User("Jonas");
jonas.createPassword("kengura123", "kengura123");
UserList.addUser("jonas");

const paulius = new User("Paulius");
paulius.addEmail("paulius@gmail.com");
paulius.addInfo(25, "teisininkas", "Palanga");
UserList.addUser("paulius");

paulius.changeInfo(37, "kasininkas", "Kaunas");

petras.addFriend(paulius);
console.log(UserList.list);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/users/", (req, res) => {
    if (req.body.name) {
        if (req.body.name.length >= 3) {
            if (UserUtil.findUser(req.body.name)) {
                res.status(400).json({
                    status: 400,
                    message: "User already exists",
                });
            } else {
                UserList.addUser(req.body.name);
                res.status(200).json({
                    status: 200,
                    message:
                        "User '" + req.body.name + "' created successfully",
                });
            }
        } else {
            if (req.body.name.length < 3) {
                res.status(400).json({
                    status: 400,
                    message: "User's name must have at least 3 characters",
                });
            } else if (req.body.name.length > 30) {
                res.status(400).json({
                    status: 400,
                    message: "User's name is too long (max - 30 characters)",
                });
            }
        }
    } else {
        res.status(404).json({
            status: 404,
            message: "User not found",
        });
    }
});

// app.post('/users/:name/add-password/', (req, res) => {
//     if (req.body.name) {
//         if (req.body.name)
//     }
//     const userName: string = req.body.name
//     const person = UserUtil.findUser(userName);
//     person.createPassword(req.body.pwd1, req.body.pwd2)
//     res.send("Password added")
// })

// app.post('/addEmail/', (req, res) => {
//     const userName: string = req.body.name
//     const user: User | undefined = UserUtil.findUser(userName);
//     if (user) {
//         user.addEmail(req.body.email)
//     } else {
//         res.status(404).json({
//             "error": 404,
//             "message": "User not found"
//         })
//     }
//     res.send("Email added")
// })

// app.post('/changeEmail/', (req, res) => {
//     const userName: string = req.body.name
//     const user = findUser(userName);
//     user.changeEmail(req.body.email)
//     res.send("Email changed")
// })

// app.post('/addInfo/', (req, res) => {
//     const userName: string = req.body.name
//     const user = findUser(userName);
//     user.addInfo(req.body.age, req.body.job, req.body.city)
//     res.send("Info added")
// })

// app.post('/changeInfo/', (req, res) => {
//     const userName: string = req.body.name
//     const user = findUser(userName);
//     user.addInfo(req.body.age, req.body.job, req.body.city)
//     res.send("Info changed")
// })

app.get("/users/", (req, res) => {
    if (UserList.list) {
        res.json(UserList.list);
    } else {
        res.status(404).json({
            status: 404,
            message: "User not found",
        });
    }
});

// app.get("/users/",  (req, res) => {
//     res.status(2020).json(UserList.list);
// })

// app.get("/users/:city",  (req, res =>) {
//     let city: any = req.params.city;
//     let users: Array<User> = [];
//     for (let i = 0; i < userList.length; i++) {
//         if (userList[i].city == city) {
//             users.addUser(userList[i])
//         }
//     }
//     res.send(users);
// })

app.listen(8080);
