const list = require("../data/OTP-pass.json");
const User = require("../user/User");
const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');

async function otpCompare(userName, email, pass, code) {

    const hashedPassword = await bcrypt.hash(pass, 12);
    list.table.forEach(function (i) {
        if (email === i.mail) {
            if (code === i.code) {
                // server.logger.log("user in create: " + user);
                let user =  new User(userName, email, hashedPassword);
                dbHandler.addUser(user);
                return 1;
            } else {
                return 0;
            }
        }
    })
}

module.exports = {otpCompare}