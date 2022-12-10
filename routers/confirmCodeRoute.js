const express = require("express");
const confirmCodeController = require("../controllers/confirmCodeController");

const confirmCodeRoute = new express.Router()

confirmCodeRoute.post('/', confirmCodeController.handleConfirmCode)

module.exports= { confirmCodeRoute }