const list = require("../data/OTP-pass.json");
const User = require("../models/users");
const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');

async function otpCompare(user) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.email = user.email.toLowerCase();
    const domain = dbHandler.typeUser(user)
    list.table.forEach(function (i) {
        if (user.email === i.mail) {
            if (user.code === i.code) {
                // server.logger.log("user in create: " + user);
                const newUser =  new User({"name": user.name,"email": user.email,"password": hashedPassword, "type": domain});
                console.log(newUser);
                dbHandler.addDoc(newUser);
                return;
            } else {
                throw new Error("wrong code")
            }
        }
    })
}

module.exports = {otpCompare}