const js = require("../data/users.json");
const list = require("../data/OTP-pass.json");
const confirmCode = require("../services/confirmCodeService");
const {constructResponse} = require('../utils/utils ');

function handleConfirmCode(request, response) {
    try {
        confirmCode.otpCompare(request.body.name, request.body.email, request.body.password, request.body.code).then(r =>{
            return constructResponse(response, {}, 200);
        })
    }catch (e) {
        console.log(e);
         return constructResponse(response, {error: e.message}, 401);
    }
}

module.exports = {handleConfirmCode}

