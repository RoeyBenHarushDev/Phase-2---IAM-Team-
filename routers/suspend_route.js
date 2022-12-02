const express = require("express");
const suspendController = require("../controllers/suspend_controller")

const suspendRoute = new express.Router()

suspendRoute.post('/', suspendController.handleSuspend)


module.exports= { suspendRoute }