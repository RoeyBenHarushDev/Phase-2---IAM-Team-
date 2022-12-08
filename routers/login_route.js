const express = require("express");
const loginRouter = new express.Router();
const login_controller = require('../controllers/login_controller');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');

loginRouter.use(express.json());
loginRouter.post('/', login_controller.loginControl)
loginRouter.get('/:email', login_controller.Permissions)

module.exports = {loginRouter};
