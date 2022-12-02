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

const getUserByEmail = (email)=>{
    const user = userJson.find(user => user.email === email);
    return user ? user : "User doesn't exist";
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


module.exports={getUserByEmail,updateUser};