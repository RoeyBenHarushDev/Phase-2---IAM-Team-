const express = require("express");
const loginRouter = new express.Router();
const login_controller = require('../controllers/login_controller');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

loginRouter.use(bodyParser.json());
loginRouter.post('/', login_controller.handleLogin)


module.exports = {loginRouter};
