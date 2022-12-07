const express = require("express");
const deleteAfter15Controller = require("../controllers/deleteAfter15_controller");


const deleteAfter15Route = new express.Router();

deleteAfter15Route.post('/', deleteAfter15Controller.handleDeleteAfter15)

module.exports= { deleteAfter15Route }