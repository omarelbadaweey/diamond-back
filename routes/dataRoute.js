const express = require('express');
const dataController = require('../controller/dataControll');

const routerData = express.Router();

routerData.route("/")
.post( dataController.createData)
.get(dataController.getAllData)

routerData.route("/:id")
.delete(dataController.deletedData)

routerData.route("/status/:id").patch( dataController.updateStatus);

routerData.post("/subscribe", dataController.subscribe);
module.exports = routerData