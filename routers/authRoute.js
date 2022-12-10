const express = require("express");
const AuthRouter = new express.Router();
const AuthController = require('../controllers/AuthController');


AuthRouter.post('/', AuthController.handleAuth)


module.exports = {AuthRouter};