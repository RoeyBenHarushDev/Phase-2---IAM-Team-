const express = require("express");
const AuthRouter = new express.Router();
const Auth_controller = require('../controllers/Auth_controller');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


AuthRouter.post('/', Auth_controller.handleAuth)


module.exports = {AuthRouter};