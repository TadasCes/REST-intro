import { User } from "./user";
import { UserList } from "./userList";

export class UserUtil {
    static findUser(name: string): User | undefined {
        const result = UserList.list.find((u) => u.name === name);
        if (result === undefined) {
            console.log("User not found");
            return undefined;
        } else {
            console.log("User" + result);
            return result;
        }
    }
}
