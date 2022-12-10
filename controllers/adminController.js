const dbHandler = require("../data/dbHandler")
const adminService = require("../services/adminService");
const User = require("../models/users");
const OTP = require("../models/OTPPass");
const jwt = require("jsonwebtoken");


async function handleAddUser(req, res) {
    try {
        if (!req.body) throw new Error("Email is required")
        let newUser = req.body;
        newUser.email = newUser.email.toLowerCase();

        const user = await dbHandler.getUserByEmail(newUser.email);
        if (user)
            throw new Error("user already exists")
        await dbHandler.addUser(newUser)
        return res.status(200).json({message: "user is closed"});
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}

async function handleShowAllUsers(req, res) {
    const users = await User.find({});
    return res.send(users);
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

async function handleSaveUpdateAdmin(req, res) {
    try {


        const user = await dbHandler.getUserByEmail(req.body.email)
        await adminService.ifClosed(user);
        const userUpdate = adminService.changeUserStatus(user, req.body);
        userUpdate.type = req.body.type
        userUpdate.name = req.body.name
        await dbHandler.updateUser(user.email, userUpdate);
        return res.status(200).json({message: "user update"})
    } catch (err) {
        return res.status(401).json({message: err.message})
    }
}

module.exports = {handleAddUser, handleShowUser, handleShowAllUsers, handleDeleteUser, handleSaveUpdateAdmin}



