const list = require("../data/OTP-pass.json")
const dbHandler = require("../data/dbHandler")
const {constructResponse} = require('../utils/utils');
const fs = require("fs");


async function handleSuspend(request, response) {
    try {
        const user = request.body;
        await ifClosed(user);
        const data = changeUserStatus(user);
        await dbHandler.updateUser(user.email, data);
        console.log(await dbHandler.getUserByEmail(user.email));
        return constructResponse(response, {}, 200);
    } catch (e) {
        if(e.message === 'user is closed'){ return constructResponse(response, {error: e.message}, 403);}
        return constructResponse(response, {error: e.message}, 401);
    }
}

async function ifClosed(userData) {
    const user = await dbHandler.getUserByEmail(userData.email);
    if (user.status === "closed") {
        throw new Error("user is closed");
    }
}

function changeUserStatus(userData) {
    let data;
    if (userData.userStatus == "suspended") {
        data = {
            "suspensionDate": new Date(),
            "suspensionTime": userData.suspensionTime,
            "status": "suspended"
        }
    }
    if (userData.userStatus == "closed") {
        data = {
            "suspensionDate": new Date(),
            "suspensionTime": 0,
            "status": "closed"
        }
    }
    if (userData.userStatus == "active") {
        data = {
            "suspensionDate": 0,
            "suspensionTime": 0,
            "status": "active"
        }
    }
    return data
}

module.exports = {handleSuspend}



