const express = require("express");
const forgotPasswordController = require("../controllers/forgotPasswordController")

const forgotPasswordRoute = new express.Router()

forgotPasswordRoute.post('/',forgotPasswordController.handleForgot)

module.exports= { forgotPasswordRoute }