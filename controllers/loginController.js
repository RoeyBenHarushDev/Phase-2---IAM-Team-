const loginService = require('../services/loginService');
const dbHandler = require("../data/dbHandler");
const jwt = require("jsonwebtoken");
const path = require("path");
const userClass = require("../models/userClass")

require('dotenv').config({ path: path.join(process.cwd() + "/data/",".env") });


const loginControl = async (req, res, next)=> {
    try {
            await loginService.handleLogin(req, res, next);
            const userFind = await dbHandler.getUserByEmail(req.body.email);
            const user = new userClass(userFind._id, userFind.type, userFind.email);
            const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
            res.cookie('token', accessToken, {httponly:true});
            res.status(200).json({});
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
    } catch (e) {
        return res.send(e.message);
    }
}


module.exports={Permissions,loginControl};