const express = require("express");
const loginRouter = new express.Router();
const loginController = require('../controllers/loginController');
const jwt = require('jsonwebtoken');
const path = require("path");

loginRouter.use(express.json());

loginRouter.post('/', loginController.loginControl)
loginRouter.get('/', (req,res)=>{
    const token = req.cookies.token;
    try {
        const userObj = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).user;
        if (userObj) {
            res.sendFile(path.join(__dirname, "..", "client", "homePage.html"));
        } else {
            res.redirect("/");
            res.end();
        }

    } catch (error) {
        res.redirect("/");
        res.end();
    }
});

loginRouter.get('/api/:email', loginController.Permissions)



module.exports = {loginRouter};
