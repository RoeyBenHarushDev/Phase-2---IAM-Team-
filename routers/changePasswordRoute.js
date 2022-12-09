const express = require("express");
const changePasswordController =require("../controllers/changePasswordController");

const changePasswordRoute = new express.Router();

changePasswordRoute.post('/', changePasswordController.handleChangePassword)

module.exports= { changePasswordRoute }