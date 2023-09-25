const express = require("express");
const users = require("./users");
const farm = require("./farm");
const invest = require("./invests");
const balance = require("./balance");
const report = require("./reports");
const router = express.Router();

router.use("/users", users);
router.use("/farms", farm);
router.use("/invests", invest);
router.use("/balances", balance);
router.use("/reports", report);

module.exports = router;
