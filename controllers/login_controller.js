const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');
const {constructResponse} = require('../utils/utils.js');

const unSuspend = async (user) => {
    await dbHandler.updateUser(user.email, {"status": "active", "suspensionTime": 0, "suspensionDate": 0});
}

async function isSuspend(user) {
    if (user.status === 'active') {
        console.log(`user: ${user["email"]} is not suspended`);
        return 0;
    }

    const today = new Date();
    const suspendTime = user.suspensionTime;
    const suspendStartDate = user.suspensionDate;
    const isSuspend = isAfter(suspendStartDate + parseInt(suspendTime), today);

    if (isSuspend) {
        console.log(`user: ${user["email"]} is suspended- login failed`, 'ERROR');
        return suspendStartDate + parseInt(suspendTime);
    } else {
        await unSuspend(user);
        console.log(`user: ${user["email"]} is no longer suspended`);
        return 0;
    }
    ;
}

const handleLogin = async (req, res, next) => {
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password;
    let user;
    try {
        user = await dbHandler.getUserByEmail(userEmail) //maybe needs await in the start and in the end.lean()
        const suspend = await isSuspend(user);

        if (suspend) {
            return constructResponse(res, {error: `User is suspended until ${isSuspend}`}, 401);
        }

        if (await bcrypt.compare(userPassword, user.password)) {
            console.log(`password correct! ${user.email} welcome`);
            const today = new Date();
            await dbHandler.updateUser(userEmail, {"loginDate": today})
            return constructResponse(res, {}, 200);
        } else {
            return res.status(401).data("password incorrect");
        }
    } catch (e) {
        console.log(e);
        return res.status(401).send({
            message: e
        })
    }
}
const Permissions = async (req, res, next) => {
    const userEmail = req.body.email.toLowerCase();
    try {
       const user = await dbHandler.getUserByEmail(userEmail)
        return "The user exists"
    }catch (e){
        return "The user does not exist"
    }
}


function isAfter(date1, date2) {
    return date1 > date2;
}

module.exports = {handleLogin, Permissions}
