const express = require('express');
const routerData = require('./dataRoute');
const router = express.Router();

router.use("/data" , routerData)
module.exports = router;
