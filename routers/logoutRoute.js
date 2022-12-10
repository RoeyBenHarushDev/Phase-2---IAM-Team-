const express = require("express");
const logoutRouter = new express.Router();
const logoutController = require('../controllers/logoutController');

logoutRouter.get('/', logoutController.logout)

module.exports = {logoutRouter};
