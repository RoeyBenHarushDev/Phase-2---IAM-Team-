const list = require("../data/OTP-pass.json");
const User = require("../user/User");


function otpCompare(userName, email, pass, code) {
    let user = new User(userName, email, pass);
    list.table.forEach(function (i) {
        if (email === i.mail) {
            if (code === i.code) {
                // server.logger.log("user in create: " + user);
                user.toJsonRow(user);
            }
            else
            {
                throw new Error("OTP is false")
            }
        }
    })
}


module.exports = {otpCompare}