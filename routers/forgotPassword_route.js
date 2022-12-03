const express = require("express");
const forgotPasswordController = require("../controllers/forgotPassword_controller")

const forgotPasswordRoute = new express.Router()

forgotPasswordRoute.post('/',forgotPasswordController.handleForgot)

module.exports= { forgotPasswordRoute }