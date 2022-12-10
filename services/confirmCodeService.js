const dbHandler = require('../data/dbHandler');
const OTP = require('../models/OTPPass');

async function otpCompare(user) {
    user.email = user.email.toLowerCase();
    const findUser = await OTP.findOne({'email': user.email});
    if (user.email === findUser.email) {
        if (user.code === findUser.code && Math.abs(new Date().getMinutes() - findUser.creationDate.getMinutes()) < 15) {
            await dbHandler.addUser(user);
        } else {
            await OTP.findOneAndDelete({'email': user.email});
            throw new Error("code is expired");
        }
    } else {
        throw new Error("user does'nt exist");
    }
}

function typeUser(user) {
    let domain = user.email.split("@");
    domain = domain[1].split(".");
    if (domain[0] === "shenkar") {
        return "admin"
    } else {
        return "user"
    }
}

module.exports = {otpCompare}