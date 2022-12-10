const express = require("express");
const signupController = require("../controllers/signUpController")

const signupRoute = new express.Router()

signupRoute.post('/', signupController.handleSignUp)


module.exports= { signupRoute }