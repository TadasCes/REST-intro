import { User } from "./user";
import { UserList } from "./userList";

export class UserUtil {
    static findUser(name: string): User | undefined {
        const result = UserList.list.find((u) => u.name === name);
        if (result === undefined) {
            console.log("User not found");
            return undefined;
        } else {
            console.log("User" + JSON.stringify(result, null, 2));
            return result;
        }
    }

    static addUser(name: string): void {
        UserList.list.push(new User(name));
        console.log("User added successfully");
    }

    static addEmail(user: User, email: string): void {
        // tslint:disable-next-line:no-unused-expression
        user.email === email;
    }

    static deleteUser(user: User): void {
        UserList.list.splice(UserList.list.indexOf(user), 1)
    }
}
