const express = require('express');
const commentController = require('../controller/comment.Controll');

const routerData = express.Router();

routerData.route("/")
.post( commentController.createData)
.get(commentController.getAllData)

routerData.route("/:id")
.delete(commentController.deletedData)


module.exports = routerData