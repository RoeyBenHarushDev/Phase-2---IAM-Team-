const js = require("../data/users.json")
const list = require("../data/OTP-pass.json")
const suspend = require("../data/dbHandler")
const constructResponse = require('../utils/utils');
const fs = require("fs");


function handleSuspend(request, response) {
    try {
        let obj = {
            "suspensionDate": new Date(),
            "suspensionTime": request.body.suspensionTime,
            "status": "suspended"
        }
        suspend.updateUser(request.body.email, obj);
         return constructResponse(response, {}, 200);

    } catch (e) {
        console.log(e);
        return constructResponse(response, {error: e.message}, 401);
    }
}

module.exports = {handleSuspend}



