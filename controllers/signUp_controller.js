const js = require("../data/users.json")
const list = require("../data/OTP-pass.json")
const fs = require("fs");
const path = require("path");
const signUp = require("../services/signUpService");
const {constructResponse} = require('../utils/utils');

async function handleSignUp(request, response) {
    try {
        const user = request.body
        user.email = user.email.toLowerCase();
        signUp.userExist()
        await signUp.sendEmail(request.body)
        // return constructResponse(response, {}, 200);

    } catch (e) {
        console.log(e);
        return constructResponse(response, {error: e.message}, 401);
    }
}

module.exports = {handleSignUp}