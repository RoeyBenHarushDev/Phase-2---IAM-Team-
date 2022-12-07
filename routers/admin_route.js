const express = require("express");
const suspendController = require("../controllers/admin_controller")

const adminRoute = new express.Router()

adminRoute.post('/suspension', suspendController.handleSuspend)
adminRoute.post('/addUser', suspendController.handleAddUser)
adminRoute.get('/showUser', suspendController.handleShowUser)
adminRoute.delete('/deleteUser/email:', suspendController.handleDeleteUser)
module.exports= { adminRoute }