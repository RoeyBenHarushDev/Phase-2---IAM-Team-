const express = require("express");
const AuthRouter = new express.Router();
const Auth_controller = require('../controllers/AuthController');


AuthRouter.post('/', Auth_controller.handleAuth)


module.exports = {AuthRouter};