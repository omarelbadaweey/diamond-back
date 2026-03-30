const express = require('express');
const routerData = require('./dataRoute');
const commentRoute = require('./commentRoute');

const router = express.Router();

router.use("/data" , routerData)
console.log("الراوتر بتاع التعليقات اتحمل تمام");
router.use("/comment" , commentRoute)

module.exports = router;
