const express = require("express");
const loginRouter = new express.Router();
const login_controller = require('../controllers/login_controller');
<<<<<<< HEAD
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
=======
>>>>>>> 276fd611e9e25b70a6a7912999db9f35e930af41

loginRouter.use(express.json());
loginRouter.post('/', login_controller.handleLogin)
loginRouter.get('/{email}', login_controller.Permissions)

module.exports = {loginRouter};
