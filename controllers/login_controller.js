const loginService = require('../services/loginService');
const dbHandler = require("../data/dbHandler");


const loginControl = async function (req, res, next) {
    try {
        await loginService.handleLogin(req, res, next);
        return res.sendStatus(200);
    } catch (e) {
        return res.status(401).json({message: e.message});
    }
}

const Permissions = async (req, res, next) => {
    try {
        const userEmail = req.params.email.toLowerCase();
        const user = await dbHandler.getUserByEmail(userEmail)

        if (!user) {
            throw new Error("user not exists");
        }
        return res.send("The user exists");
    } catch (e) {
        return res.send(e.message);
    }
}


module.exports={Permissions,loginControl};