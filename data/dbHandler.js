const users = require('./users.json');
const fs = require("fs");
/*const {User} = require('./userClass');*/

class User{
    constructor(
        name,
        email,
        password,
        lastLoginDate = new Date(),
        type = 'user',
        status = "active",
        suspensionTime = "0",
        suspensionDate = "null"
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.lastLoginDate = lastLoginDate;
        this.type = type;
        this.status = status;
        this.suspensionTime = suspensionTime;
        this.suspensionDate = suspensionDate;
    }

}

const getUserByEmail = (email)=>{
    const user = users.find(user => user.email === email);
    return user ? user : "User does'nt exist";
}

function updateUser(email, params) {
    const keys = Object.keys(params);
    const keyForChange = keys[0];
    let value = params[keyForChange];
    const oldUser = getUserByEmail(email);
    Object.keys(oldUser).forEach(function (key) {
        if (key === keyForChange) {
            oldUser[key] = value;
        }
    })
}
console.log(users["users"]);
function addUser(user){
    const newUser = new User(user);
    users["users"].push(newUser);
}

const u = new User('ro','rrrr','111');
addUser(u);