const dbHandler = require("../data/dbHandler")
const adminService = require("../services/adminService");
const User = require("../models/users");
const OTP = require("../models/OTPPass");
const mailerAPI = require("../growth/mailerAPI");


async function handleAddUser(req, res) {
    try {
        if (!req.body.email) throw new Error("Email is required")
        let newUser = req.body;
        newUser.email = newUser.email.toLowerCase();

        const user = await dbHandler.getUserByEmail(newUser.email);
        if (user)
            throw new Error("user already exists")
        await dbHandler.addUser(newUser)
        return res.status(200).json({message:"User was added"});
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
    } catch (err) {
        return res.status(401).json({message: "User cannot be deleted because does not exist"})
    }
}

async function handleShowUser(req, res) {
    const user = await dbHandler.getUserByEmail(req.params.email);
    return res.send(JSON.stringify(user));
}

async function handleSaveUpdate(req, res) {
    try {
        if (req.body.suspensionTime < 0)
            throw new Error("Suspension time must be a positive number")
        if (req.body.status==='active' && req.body.suspensionTime>0 ){
            throw new Error("Cannot define suspension time on active user, suspension time defined to 0")
        }
        if (req.body.type === 'admin' || req.body.type === 'user') {
            let user = await dbHandler.getUserByEmail(req.body.email);
            await adminService.ifClosed(user);
            user.type = req.body.type;
            user.name = req.body.name;
            const updeteUser = adminService.changeUserStatus(user,req.body);

            await dbHandler.updateUser(req.body.email, updeteUser);
            // Growth team API(mailerAPI) - sending email after suspending a user.
            await mailerAPI.sendMail(user.email, 'suspend',' <h1>User suspended</h1>');
            return res.status(200).json({message: "user was updated"})
        } else {
            throw new Error("Invalid permission! Please choose a user or admin \nChanges are not saved")
        }
    } catch (err) {
        return res.status(401).json({message: err.message})
    }

}
module.exports = {handleAddUser, handleShowUser, handleShowAllUsers, handleDeleteUser, handleSaveUpdate}



