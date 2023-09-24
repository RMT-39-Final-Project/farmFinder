const express = require("express");
const users = require("./users");
const farm = require("./farm");
const invest = require("./invests");
const balance = require("./balance");
const report = require("./reports");
const router = express.Router();

router
    .use("/users", users)
    .use("/balances", balance)
    .use("/farms", farm)
    .use("/reports", report)
    // .use("/invest", invest)

module.exports = router;
