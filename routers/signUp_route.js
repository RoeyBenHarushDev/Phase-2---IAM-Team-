const express = require("express");
const signupController = require("../controllers/signUp_controller")

const signupRoute = new express.Router()

signupRoute.post('/', signupController.handleSignUp)


module.exports= { signupRoute }