const express = require("express");
const suspendController = require("../controllers/suspend_controller")

const adminRoute = new express.Router()

adminRoute.post('/suspension', suspendController.handleSuspend)
adminRoute.post('/addUser', suspendController.handleAddUser)

module.exports= { adminRoute }