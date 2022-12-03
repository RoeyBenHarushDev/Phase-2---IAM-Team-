const js = require("../data/users.json");
const list = require("../data/OTP-pass.json");
const confirmCode = require("../services/confirmCodeService");
const {constructResponse} = require('../utils/utils');

 function handleConfirmCode(request, response) {
    console.log(request.body)

    const otp = confirmCode.otpCompare(request.body.name, request.body.email, request.body.password, request.body.code)
    console.log(otp)
    if(otp){
        return constructResponse(response, {}, 200);
    } else {
        return constructResponse(response, {error: otp}, 401);
    }
}

module.exports = {handleConfirmCode}

