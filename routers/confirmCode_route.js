const express = require("express");
const confirmCodeController = require("../controllers/confirmCode_controller");

const confirmCodeRoute = new express.Router()

confirmCodeRoute.post('/', confirmCodeController.handleConfirmCode)

module.exports= { confirmCodeRoute }