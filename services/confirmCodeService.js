const list = require("../data/OTP-pass.json");
const User = require("../user/User");
const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');

async function otpCompare(user) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.email = user.email.toLowerCase();
    const domain = typeUser(user)
    list.table.forEach(function (i) {
        if (user.email === i.mail) {
            if (user.code === i.code) {
                // server.logger.log("user in create: " + user);
                let newUser =  new User(user.name, user.email, hashedPassword,domain);
                dbHandler.addUser(newUser);
                return 1;
            } else {
                return 0;
            }
        }
    })
}
function typeUser(user) {
    let domain = user.email.split("@");
    domain = domain[1].split(".");
    console.log(domain)
    if (domain[0] == "shenkar") {
        return "admin"
    } else {
        return "user"
    }
}

module.exports = {otpCompare}