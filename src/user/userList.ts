import { User } from "./user";

export class UserList {
    static list: User[] = [];

    static addUser(name: string): void {
        this.list.push(new User(name));
        console.log("User added successfully");
    }
}
