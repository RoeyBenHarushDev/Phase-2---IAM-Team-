const js = require("../data/users.json")
const list = require("../data/OTP-pass.json")
const fs = require("fs");
const path = require("path");
const signUp = require("../services/signUpService");
const {constructResponse} = require('../utils/utils ');



async function handleSignUp(request,response) {
            try {
                signUp.userExist(request.body.email)
                await signUp.sendEmail(request.body.email)
                // return constructResponse(response, {}, 200);

            } catch (e) {
                console.log(e);
                 return constructResponse(response, {error: e.message}, 401);
            }
}

module.exports =  { handleSignUp }