const User = require("../models/users");
const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');
const OTP = require('../models/OTP-pass');

async function otpCompare(user) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.email = user.email.toLowerCase();
        const domain = typeUser(user)
        const findUser = await OTP.findOne({'email': user.email});
        if (user.email === findUser.email) {
            if (user.code === findUser.code && Math.abs(new Date().getMinutes() - findUser.creationDate.getMinutes()) < 1) {
                // server.logger.log("user in create: " + user);
                const newUser = new User({
                    "name": user.name,
                    "email": user.email,
                    "password": hashedPassword,
                    "type": domain
                });
                await dbHandler.addDoc(newUser);
                return;
            } else {
                OTP.findOneAndDelete({'email': user.email});
                throw new Error("code is expired");
            }
        } else {
            throw new Error("user does'nt exist");
        }
    }catch(e){
        console.log(e);
        //return constructResponse()
    }
}
function typeUser(user) {
    let domain = user.email.split("@");
    domain = domain[1].split(".");
    if (domain[0] == "shenkar") {
        return "admin"
    } else {
        return "user"
    }
}

module.exports = {otpCompare}