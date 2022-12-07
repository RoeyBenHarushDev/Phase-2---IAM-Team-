const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');
<<<<<<< HEAD
const {constructResponse} = require('../utils/utils.js');

const unSuspend= async (user) => {
=======

const unSuspend = async (user) => {
>>>>>>> 276fd611e9e25b70a6a7912999db9f35e930af41
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
    let user;

try {
    user = await dbHandler.getUserByEmail(userEmail) //maybe needs await in the start and in the end.lean()
    if(!user){
        throw new Error("user does'nt exist")
    }
    const suspend = await isSuspend(user);
    if(suspend){
        return res.status(403).json({message:`User is suspended until ${isSuspend}`});}
    if (await bcrypt.compare(userPassword, user.password)) {
        console.log(`password correct! ${user.email} welcome`);
        const today=new Date();
        await dbHandler.updateUser(userEmail, {"loginDate": today})
        return res.send(200)
    }
    return res.status(401).json({message:"incorrect password"});
}catch(e) {
    return res.status(400).json({message:"user does'nt exist"});
}}


const Permissions = async (req, res, next) => {
    try {
        const userEmail = req.body.email.toLowerCase();
        const user = await dbHandler.getUserByEmail(userEmail)

        if (!user) {
            throw new Error("user not exists");
        }
        return res.send("The user exists");
    } catch (e) {
        return res.send(e.message);
    }
}

function isAfter(date1, date2) {
    return date1 > date2;
}

module.exports = {handleLogin, Permissions}
