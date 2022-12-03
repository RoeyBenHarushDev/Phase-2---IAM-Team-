// const path = require("path");
// const fs = require("fs");
// const { channel } = require("diagnostics_channel");
// const { stringify } = require("querystring");
// const userJson = require("../data/users.json")
// const JSON = require("JSON");


// module.exports =  { updateUser }

const fs = require("fs");
const JSON = require("JSON");
const userJson = require("./users.json");

const getUserByEmail = (email) => {
    const user = userJson.find(user => user.email === email);
     if(!user) throw new Error("User doesn't exist");
     return user;
}

// Update user from JSON
function updateUser(email, params) {
    userJson.forEach(function (i) {
        if (i.email === email) {
            Object.keys(params).forEach(key => {
                i[key] = params[key];
            })
        }
    })
    const json = JSON.stringify(userJson)
    fs.writeFile(process.cwd() + "/data/users.json", json, 'utf-8', callback => {
        // server.logger.log("wrote file successfully")
    })
    console.log(userJson);
}

const addUser = (new_user) => {
    try {
        let json
        let obj = {
            name: new_user.name,
            email: new_user.email,
            password: new_user.password,
            loginDate: new_user.loginDate,
            type: new_user.status,
            status: new_user.type,
            suspensionTime: new_user.suspensionTime,
            suspensionDate: new_user.suspensionDate
        }
        userJson.push(obj)

        json = JSON.stringify(userJson)
        fs.writeFile(process.cwd() + "/data/users.json", json, 'utf-8', callback => {
            // server.logger.log("wrote file successfully")
        })
    } catch (err) {
        console.error({err});
    }
}

module.exports = {getUserByEmail, updateUser, addUser};