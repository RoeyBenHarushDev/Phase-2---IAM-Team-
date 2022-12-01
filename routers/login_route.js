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
loginRouter.post('/', login_controller.handleLogin)




module.exports = {loginRouter};
