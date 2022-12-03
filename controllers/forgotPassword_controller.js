const {constructResponse} = require('../utils/utils');
const forgotPassService = require("../services/forgotPassService");
const dbHandler = require("../data/dbHandler");
const bcrypt = require("bcrypt");

async function handleForgot(req, res) {
    try {
        req.body.email =  req.body.email.toLowerCase();
        const user = dbHandler.getUserByEmail(req.body.email)
        const newPass = forgotPassService.generatePassword();
        await forgotPassService.sendPassword(newPass, user);
        const hashedPassword = await bcrypt.hash(newPass, 12);
        dbHandler.updateUser(user.email, {"password": hashedPassword});

    } catch (e) {
        console.log(e);
        return constructResponse(res, {error: e.message}, 403);
    }

}

module.exports = {handleForgot}