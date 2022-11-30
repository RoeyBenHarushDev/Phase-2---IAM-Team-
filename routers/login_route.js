const express = require("express")
const loginRouter = new express.Router()
const { login_controller }= require('../controllers/login_controller');
const bodyParser = require("express");
const bcrypt = require('bcrypt');

loginRouter.use(bodyParser.json());
loginRouter.post('/login', async(req,res)=>{
    const {userEmail,userPassword} = req.body;
    const user = login_controller.getUserByEmail(userEmail) //maybe needs await in the start and in the end.lean()
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }
    if (await bcrypt.compare(userPassword, user.password)) {
        /*password is correct*/
        const token = 1;
/*            jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )*/
        return res.json({ status: 'ok', data: token })
    }
    res.json({ status: 'error', error: 'Invalid username/password' })
    const isSuspend = login_controller.isSuspend(user);
    if(isSuspend){
        return res.json({ status: 'error', error: `User is suspended until ${isSuspend}`})
    }
})

module.exports = {loginRouter};
