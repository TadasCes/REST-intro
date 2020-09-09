export class User {
  name: string;
  password: string | undefined;
  email: string | undefined;
  age: number | undefined;
  job: string | undefined;
  city: string | undefined;
  friendList: User[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addFriend(friend: any): void {

    // tslint:disable-next-line:no-shadowed-variable
    if (!this.friendList.find(friend => friend.name === this.name)) {
      this.friendList.push(friend);
      const friendBack: string = this.name;
      if (friend.addFriend) {
        friend.addFriend(friendBack);
      }
    }
  }

  createPassword(pwd1: string, pwd2: string): void {
    if (pwd1.length <= 8) {
      error("Password must be at least 8 characters long");
    } else {
      if (pwd1 !== pwd2) {
        error("Passwords must match, try again");
      } else {
        this.password = pwd1;
      }
    }
  }

  addEmail(email: string): void {
    if (this.email === undefined) {
      if (email !== "") {
        this.email = email;
      } else {
        error("Email is invalid");
      }
    } else {
      error("Email already defined");
    }
  }

  changeEmail(newEmail: string): void {
    if (this.email !== undefined) {
      if (this.email === newEmail) {
        error("New email can't be old email");
      } else {
        if (newEmail === "") {
          error("Email is invalid");
        } else {
          this.email = newEmail;
        }
      }
    }
  }

  addInfo(age: number, job: string, city: string): void {
    if (age <= 0) {
      error("Age is not valid");
    } else {
      if (Number(age)) {
        this.age = age;
      } else {
        error("Invalid input");
      }
    }

    if (job === "") {
      error("Job input is invalid");
    } else {
      this.job = job;
    }

    if (city === "") {
      error("Job input is invalid");
    } else {
      this.city = city;
    }
  }

  changeInfo(newAge: number, newJob: string, newCity: string) {
    //   if (this.age <= 0) {
    //     error("Age is not valid");
    //   } else {
    if (Number(newAge)) {
      this.age = newAge;
    } else {
      error("Invalid input");
    }
    //   }

    if (this.job === "") {
      error("Job input is invalid");
    } else {
      this.job = newJob;
    }

    if (this.city === "") {
      error("Job input is invalid");
    } else {
      this.city = newCity;
    }
  }
}

function error(message: string): void {
  throw new Error(message);
}
