const express = require("express");
const loginRouter = new express.Router();
const login_controller = require('../controllers/login_controller');

loginRouter.post('/', login_controller.handleLogin)


module.exports = {loginRouter};
