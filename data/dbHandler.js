const users = require('./users.json');
const fs = require("fs");
const JSON = require("JSON");
const {User} = require('./userClass');

const getUserByEmail = (email)=>{
    const user = users["users"].find(user => user.email === email);
    return user ? user : "User does'nt exist";
}

function updateUser(email, params) {
    const keys = Object.keys(params);
    const keyForChange = keys[0];
    let value = params[keyForChange];
    const oldUser = getUserByEmail(email);
    users["users"].forEach((obj)=>{
        if(email === obj.email) {
            obj[keyForChange] = value;
        }
    })
    let json = JSON.stringify(users)

    fs.writeFile(__dirname + "/users.json", json, 'utf-8', callback => {
        // server.logger.log("wrote file successfully")
    });
    console.log(oldUser);
}
async function addUser(user) {
    const newUser = new User(user.name,user.email,user.password,user.lastLoginDate,user.type,
        user.status,user.suspensionTime,user.suspensionDate);
    console.log(JSON.stringify(newUser));
    users["users"].push(newUser);
    let json = JSON.stringify(users)

    fs.writeFile(__dirname + "/users.json", json, 'utf-8', callback => {
    });
}

module.exports={getUserByEmail,addUser,updateUser};