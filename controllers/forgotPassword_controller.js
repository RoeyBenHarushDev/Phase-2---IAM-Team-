const constructResponse = require('../utils/utils ');
const dbhandler = require("../data/dbHandler");
const forgotPassService = require("../services/forgotPassService");
const dbHandler = require("../data/dbHandler");

async function handleForgot(req, res) {
    try {
        const user = dbhandler.getUserByEmail(req.body.email)
        const newPass = forgotPassService.generatePassword();
        user.email = user.email.toLowerCase();
        await forgotPassService.sendPassword(newPass, user);
        dbHandler.updateUser(user, {"password": newPass})
    } catch (e) {
        console.log(e);
        return constructResponse(res, {error: e.message}, 403);
    }

}

module.exports = {handleForgot}