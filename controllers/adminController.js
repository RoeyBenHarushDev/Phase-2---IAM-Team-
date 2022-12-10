const dbHandler = require("../data/dbHandler")
const adminService = require("../services/adminService");
const User = require("../models/users");
const OTP = require("../models/OTPPass");


async function handleAddUser(req, res) {
    try {
        if (!req.body.email) throw new Error("Email is required")
        let newUser = req.body;
        newUser.email = newUser.email.toLowerCase();

        const user = await dbHandler.getUserByEmail(newUser.email);
        if (user)
            throw new Error("user already exists")
        await dbHandler.addUser(newUser)
        return res.status(200).json({message: "user add"});
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}

async function handleShowAllUsers(req, res) {
    const showAllUser = await User.find({});
    return res.send(JSON.stringify(showAllUser));
}

async function handleDeleteUser(req, res) {
    try {
        await User.findOneAndDelete({'email': req.body.email});
        await OTP.findOneAndDelete({'email': req.body.email});
        return res.status(200).json({message: "The user has been deleted"})
    } catch (e) {
        return res.status(401).json({message: e.message})
    }
}

async function handleShowUser(req, res) {
    const user = await dbHandler.getUserByEmail(req.params.email);
    return res.send(JSON.stringify(user));
}

async function handleSaveUpdate(req, res) {
    try {
        if (req.body.suspensionTime < 0 )
            throw new Error("Suspension time must be a positive number")
        if (req.body.type === 'admin' || req.body.type === 'user') {
            const user = await dbHandler.getUserByEmail(req.body.email);
            await adminService.ifClosed(user);
            const updeteUser = adminService.changeUserStatus(user,req.body);
            await dbHandler.updateUser(req.body.email, updeteUser);
            return res.status(200).json({message: "user update"})
        } else {
            throw new Error("Invalid permission! Please choose a user or admin \nChanges are not saved")
        }
    } catch (err) {
        return res.status(401).json({message: err.message})
    }

}
module.exports = {handleAddUser, handleShowUser, handleShowAllUsers, handleDeleteUser, handleSaveUpdate}



