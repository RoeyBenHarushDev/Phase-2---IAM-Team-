const loginService = require('../services/loginService');
const dbHandler = require("../data/dbHandler");
const jwt = require("jsonwebtoken");
const path = require("path");
let refreshTokens = [];

const loginControl = async function (req, res, next) {
    try {
            await loginService.handleLogin(req, res, next);
            const email = req.body.email;
            const user = { name: email }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
            const refreshToken = jwt.sign(email, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken)
            res.cookie('token', accessToken)
            res.cookie('refreshToken', refreshToken);
            res.redirect(200, '/homePage')
          /*  res.json({accessToken: accessToken}).status(200);*/
    } catch (e) {
        return res.status(401).json({message: e.message});
    }
    /*next();*/
}

function authenticateToken(req,res,next){
    const authHeader = req.headers = ['authorization'];
    const token = authHeader && authHeader.toString().split(" ")[1];
    if (token==null) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err){
            console.log(err);
            return res.sendStatus(403);  //token is no longer valid
        }
        next();
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

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


module.exports={Permissions,loginControl,authenticateToken};