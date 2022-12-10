const express = require("express");
const authRouter = new express.Router();
const authController = require('../controllers/AuthController');


authRouter.post('/', authController.handleAuth)


module.exports = {authRouter: authRouter};