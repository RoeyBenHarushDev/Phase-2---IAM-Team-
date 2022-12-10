const express = require("express");
const suspendController = require("../controllers/adminController")

const adminRoute = new express.Router()

adminRoute.post('/suspension', suspendController.handleSuspend);
adminRoute.post('/addUser', suspendController.handleAddUser);

adminRoute.get('/showUsers', suspendController.handleShowAllUsers);
adminRoute.get('/showUser/:email', suspendController.handleShowUser);

adminRoute.put('/updateUser', suspendController.handleSaveUpdate);
adminRoute.delete('/deleteUser', suspendController.handleDeleteUser);

module.exports= { adminRoute }