const express = require("express");
const suspendController = require("../controllers/adminController")

const adminRoute = new express.Router()

adminRoute.post('/addUser', suspendController.handleAddUser);

adminRoute.get('/showAllUsers', suspendController.handleShowAllUsers);
adminRoute.get('/showUser/:email', suspendController.handleShowUser);

adminRoute.put('/saveUpdateAdmin', suspendController.handleSaveUpdateAdmin);
adminRoute.delete('/removeUser', suspendController.handleDeleteUser);

module.exports= { adminRoute }