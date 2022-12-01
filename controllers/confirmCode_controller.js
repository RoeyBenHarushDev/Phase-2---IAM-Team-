const js = require("../data/users.json")
const list = require("../data/OTP-pass.json")
const confirmCode = require("../services/confirmCodeService")


function handleConfirmCode(request,response) {
    let body = [];
    request
        .on("error", (err) => {
            console.error(err);
        })
        .on("data", (chunk) => {
            body.push(chunk);
        })
        .on("end", () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            try {
                console.log(body);
                confirmCode.otpCompare(body.name, body.email, body.password, body.code)
                // return constructResponse(response, {}, 200);

            } catch (e) {
                console.log(e);
                // return constructResponse(response, {error: e.message}, 401);
            }
        })

}


module.exports =  { handleConfirmCode }

