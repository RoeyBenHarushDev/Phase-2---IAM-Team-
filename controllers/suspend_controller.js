const dbHandler = require("../data/dbHandler")
const {constructResponse} = require('../utils/utils');
const fs = require("fs");


async function handleSuspend(request, response) {
    try {
        ifClosed(request.body);
        const data = changeUserStatus(request.body);
        await dbHandler.updateUser(request.body.email, data)
        return constructResponse(response, {}, 200);
    } catch (e) {
        console.log(e);
        return constructResponse(response, {error: e.message}, 401);
    }
}

function ifClosed(userData) {
        const user = dbHandler.getUserByEmail(userData.email);
        if (user.status === "closed") {
            throw new Error("user is closed");
        }
}

function changeUserStatus(userData) {
    let data;
    if (userData.userStatus == "suspended") {
        data = {
            "suspensionDate": new Date(),
            "suspensionTime": data.suspensionTime,
            "status": "suspended"
        }
    }
    if (userData.userStatus == "closed") {
        data = {
            "suspensionDate": new Date(),
            "suspensionTime": "0",
            "status": "closed"
        }
    }
    if (userData.userStatus == "active") {
        data = {
            "suspensionDate": "null",
            "suspensionTime": "0",
            "status": "active"
        }
    }
    return data
}

module.exports = {handleSuspend}



