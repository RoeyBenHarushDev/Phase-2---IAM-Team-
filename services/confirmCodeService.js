const list = require("../data/OTP-pass.json");
const User = require("../user/User");
// const bcrypt = require('bcrypt');

function otpCompare(userName, email, pass, code) {
    console.log("in OTP_Compare");
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(pass, salt, function(err, hash) {
    //         pass = hash;
    //     });
    // });
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