const loginService = require('../services/loginService');
const dbHandler = require("../data/dbHandler");
const jwt = require("jsonwebtoken");
const userClass = require("../models/userClass")

const loginControl = async (req, res, next) => {

    try {
        await loginService.handleLogin(req, res, next);
        const userFind = await dbHandler.getUserByEmail(req.body.email);
        const user = new userClass(userFind._id, userFind.type, userFind.email);
        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
        res.cookie('token', accessToken, {httponly: true});
        res.cookie('email', userFind.email, {httponly: true});
        res.cookie('type', userFind.type, {httponly: true});

       return res.status(200).json({'status':200, 'message': 'validaion succeeded! welcome' });


    } catch (err) {
        console.log(err);
        return res.status(401).json({message: err.message});
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


module.exports = {Permissions, loginControl};