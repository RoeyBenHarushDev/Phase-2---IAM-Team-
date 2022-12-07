const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');

const unSuspend= async (user) => {
    await dbHandler.updateUser(user.email, {"status": "active", "suspensionTime": 0, "suspensionDate": 0});
}

async function isSuspend(user) {
    if (user.status === 'active') {
        console.log(`user: ${user["email"]} is not suspended`);
        return 0;
    } else if (user.status === 'suspended') {
        const today = new Date();
        const suspendTime = parseInt(user.suspensionTime);
        const suspendStartDate = user.suspensionDate;
        let dateExpired = suspendStartDate;
        dateExpired.setDate(suspendStartDate.getDate() + suspendTime)
        const isSuspend = isAfter(dateExpired, today);
        if (isSuspend) {
            console.log(`user: ${user["email"]} is suspended- login failed`, 'ERROR');
            return suspendStartDate + parseInt(suspendTime);
        } else {
            await unSuspend(user);
            console.log(`user: ${user["email"]} is no longer suspended`);
            return 0;
        }
    } else if (user.status === 'closed') {
        console.log(`user: ${user["email"]} is closed forever! bye bye`);
        return "forever";
    }
}

const handleLogin = async (req, res, next) => {
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password;
    const user = await dbHandler.getUserByEmail(userEmail)
    if(!user){
        throw new Error("user doesn't exist")
    }
    const suspend = await isSuspend(user);
    if(suspend)
        { throw new Error(`User is suspended until ${isSuspend}`)}
    if (!await bcrypt.compare(userPassword, user.password))
        { throw new Error("incorrect password")}
    console.log(`password correct! ${user.email} welcome`);
    const today=new Date();
    await dbHandler.updateUser(userEmail, {"loginDate": today})
}



function isAfter(date1, date2) {
    return date1 > date2;
}

module.exports = {handleLogin}