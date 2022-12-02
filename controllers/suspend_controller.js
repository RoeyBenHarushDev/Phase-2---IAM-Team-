const js = require("../data/users.json")
const list = require("../data/OTP-pass.json")
const suspend = require("../data/dbHandler")
const fs = require("fs");



function handleSuspend(request,response) {
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
                let obj = {
                    "suspensionDate": new Date(),
                    "suspensionTime": body.suspensionTime,
                    "status":"suspended"
                }

                suspend.updateUser(body.email,obj);
                // return constructResponse(response, {}, 200);

            } catch (e) {
                console.log(e);
                // return constructResponse(response, {error: e.message}, 401);
            }
        })

}

module.exports =  { handleSuspend }



