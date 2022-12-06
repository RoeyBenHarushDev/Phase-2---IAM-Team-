const list = require("../data/OTP-pass.json")
const dbHandler = require("../data/dbHandler")
const {constructResponse} = require('../utils/utils');
const fs = require("fs");
const User = require("../models/users");
const bcrypt = require("bcrypt");

async function addUser(user) {
    user.password = await bcrypt.hash(user.password, 12);
    user.email = user.email.toLowerCase();
    const domain = dbHandler.typeUser(user)
    const newUser =  new User({"name": user.name,"email": user.email,"password": user.password, "type": domain});
    await dbHandler.addDoc(newUser);
}

async function handleSuspend(request, response) {
    try {
        const user = request.body;
        await ifClosed(user);
        const data = changeUserStatus(user);
        await dbHandler.updateUser(user.email, data);

        return constructResponse(response, {}, 200);
    } catch (e) {
        if (e.message === 'user is closed') {
            return constructResponse(response, {error: e.message}, 403);
        }
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

async function handleAddUser(req, res) {
    try {
        let newUser = req.body;
        newUser.email = newUser.email.toLowerCase;
        let user = await dbHandler.getUserByEmail(newUser.email);

        const domain = dbHandler.typeUser(user)
        const hashedPassword = await bcrypt.hash(user.password, 12);
        const addUser =  new User({"name": newUser.name,"email": newUser.email,"password": hashedPassword, "type": domain});
        console.log(addUser);
        await dbHandler.addDoc(addUser);
    }catch (e) {

    }

}

module.exports = {handleSuspend, handleAddUser}



