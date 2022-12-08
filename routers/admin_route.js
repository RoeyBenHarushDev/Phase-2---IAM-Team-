const express = require("express");
const suspendController = require("../controllers/admin_controller")

const adminRoute = new express.Router()

adminRoute.post('/suspension', suspendController.handleSuspend);
adminRoute.post('/addUser', suspendController.handleAddUser);

adminRoute.get('/showUser', suspendController.handleShowAllUsers);
adminRoute.get('/showUser/:email', suspendController.handleShowUser);

adminRoute.put('/saveUpdateAdmin', suspendController.handleSaveUpdateAdmin);
adminRoute.delete('/removeUser', suspendController.handleDeleteUser);

module.exports= { adminRoute }