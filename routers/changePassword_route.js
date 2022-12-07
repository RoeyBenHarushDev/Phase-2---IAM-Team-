const express = require("express");
const changePasswordController =require("../controllers/changePassword_controller");

const changePasswordRoute = new express.Router();

changePasswordRoute.post('/', changePasswordController.handleChangePassword)

module.exports= { changePasswordRoute }