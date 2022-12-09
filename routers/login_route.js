const express = require("express");
const loginRouter = new express.Router();
const login_controller = require('../controllers/login_controller');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const path = require("path");

loginRouter.use(express.json());

loginRouter.post('/', login_controller.loginControl)
loginRouter.get('/', (req,res)=>{
    const token = req.cookies.token;
    console.log(token);
    try {
        const userObj = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).user;
        if (userObj.type === "admin") {
            res.sendFile(path.join(__dirname, "..", "clientPublic", "homePage.html"));
        } else {
            res.redirect("/");
            res.end();
        }

    } catch (error) {
        res.redirect("/");
        res.end();
    }
});

//loginRouter.get('/', login_controller.Permissions)



module.exports = {loginRouter};
