import { User } from "./user/user";
import { UserList } from "./user/userList";
import { UserUtil } from "./user/userUtil";
import express from "express";
import bodyParser from "body-parser";

const petras = new User("Petras");
petras.createPassword("automobilis", "automobilis");
petras.addEmail("petras@gmail.com");
petras.addInfo(48, "stalius", "Birzai");
UserUtil.addUser("petras");

const jonas = new User("Jonas");
jonas.createPassword("kengura123", "kengura123");
UserUtil.addUser("jonas");

const paulius = new User("Paulius");
paulius.addEmail("paulius@gmail.com");
paulius.addInfo(25, "teisininkas", "Palanga");
UserUtil.addUser("paulius");

paulius.changeInfo(37, "kasininkas", "Kaunas");

petras.addFriend(paulius);
console.log(UserList.list);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/users/", (req, res) => {
    if (req.body.name) {
        if (req.body.name.length > 30) {
            res.status(400).json({
                status: 400,
                message: "User's name is too long (max - 30 characters)",
            });
        }
        if (req.body.name.length < 3) {
            res.status(400).json({
                status: 400,
                message: "User's name must have at least 3 characters",
            });
        }
        if (typeof req.body.name !== "string") {
            res.status(400).json({
                status: 400,
                message: "Invalid name",
            });
        }
        if (UserUtil.findUser(req.body.name)) {
            res.status(400).json({
                status: 400,
                message: "User already exists",
            });
        } else {
            UserUtil.addUser(req.body.name);
            res.status(200).json({
                status: 200,
                message: "User '" + req.body.name + "' created successfully",
            });
        }
    } else {
        res.status(400).json({
            status: 400,
            message: "User name not provided",
        });
    }
});

app.put("/users/add-password/", (req, res) => {
    if (req.body.name) {
        let errorMessage: string = "";
        if (UserUtil.findUser(req.body.name)) {
            if (req.body.password1) {
                // if (req.body.password1.match(/^?=.*\d/)) {
                //     errorMessage += "Password must have at least one digit. "
                // }
                // if (req.body.password1.match(/^?=.*[a-z]/)) {
                //     errorMessage += "Password must have at one lower case letter. "
                // }
                // if (req.body.password1.match(/^?=.*[A-Z]/)) {
                //     errorMessage += "Password must have at one upper case letter. "
                // }
                // if (req.body.password1.match(/^[a-zA-Z0-9]{8,}/)) {
                //     errorMessage += "Password must be longer than 8 symbols. "
                // }
                if (req.body.password1.length < 8) {
                    errorMessage += "Password must be longer than 8 symbols. ";
                    res.status(400).json({
                        status: 400,
                        message: errorMessage,
                    });
                }
            }
            if (req.body.password2) {
                if (req.body.password2.length < 8) {
                    errorMessage += "Password must be longer than 8 symbols. ";
                    res.status(400).json({
                        status: 400,
                        message: errorMessage,
                    });
                }
            }
            if (req.body.password1 !== req.body.password2) {
                res.status(400).json({
                    status: 400,
                    message: "Passwords must match",
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Password added",
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
    } else {
        res.status(404).json({
            status: 404,
            message: "Please provide user name",
        });
    }
});

app.put("/users/add-email/", (req, res) => {
    if (req.body.name) {
        const user: User | undefined = UserUtil.findUser(req.body.name);
        if (user) {
            if (user.email !== undefined) {
                res.status(400).json({
                    status: 400,
                    message: "Email already defined",
                });
            } else {
                if (req.body.email.length < 8) {
                    res.status(400).json({
                        status: 400,
                        message: "Email has to be valid",
                    });
                } else {
                    UserUtil.addEmail(user, req.body.email);
                    res.status(200).json({
                        status: 200,
                        message: "Email added",
                    });
                }
            }
        } else {
            res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
    } else {
        res.status(404).json({
            status: 404,
            message: "Please provide user name",
        });
    }
});

app.patch("/users/change-email/", (req, res) => {
    if (req.body.name) {
        const user: User | undefined = UserUtil.findUser(req.body.name);
        if (user) {
            if (req.body.email.length < 8) {
                res.status(400).json({
                    status: 400,
                    message: "Email has to be valid",
                });
            if (req.body.email !== user.email) {
                res.status(400).json({
                    status: 400,
                    message: "Email must be different",
                });
            }
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Email changed",
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
    } else {
        res.status(404).json({
            status: 404,
            message: "Please provide user name",
        });
    }
});

app.delete('/users/:name', (req,res) => {
    if (req.params.name) {
        const user: User | undefined = UserUtil.findUser(req.params.name);
        if (user === undefined) {
            res.status(404).json({
                status: 404,
                message: "User not found",
            });
        } else {
            UserUtil.deleteUser(user);
            res.status(200).json({
                status: 200,
                message: "User deleted",
            });
        }
    } else {
        res.status(404).json({
            status: 404,
            message: "Please provide user name",
        });
    }
})

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

app.get("/users/:name", (req, res) => {
    const user = UserUtil.findUser(req.params.name);
    if (user) {
        res.json(user);
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
