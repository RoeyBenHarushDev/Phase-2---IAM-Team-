const express = require("express");
const loginRouter = new express.Router();
const login_controller = require('../controllers/login_controller');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const users = require("../data/users.json");

/*    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(users[0].password, salt, function(err, hash) {
            // returns hash
            console.log(users[0].password);
            console.log(hash);
            users[0].password=hash;
        });
    });*/

loginRouter.use(bodyParser.json());
loginRouter.post('/login',async(req,res)=> {
    const userEmail=req.body.email;
    const userPassword=req.body.password;
    const user = login_controller.getUserByEmail(userEmail) //maybe needs await in the start and in the end.lean()
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }
    const isSuspend = login_controller.isSuspend(user);
    if(isSuspend){
        return res.json({ status: 'error', error: `User is suspended until ${isSuspend}`})
    }
    if (await bcrypt.compare(userPassword, user.password)) {
        /*password is correct
        const token = 1;
                    jwt.sign(
        {
            id: user._id,
                username: user.username
        },
        JWT_SECRET
    )
        return res.json({ status: 'ok', data: token })
        */
        res.send('/homePage')
    }
    else return res.json({status: 'error', error: 'Invalid password'})
})


module.exports = {loginRouter};
