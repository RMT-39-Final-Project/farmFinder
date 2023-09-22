const express = require("express");
const users = require("./users");
const farm = require("./farm");
const invest = require("./invests");
const balance = require("./balance");
const report = require("./reports");
const router = express.Router();

router.use("/users", users);
router.use("/farm", farm);
router.use("/invest", invest);
router.use("/balance", balance);
router.use("/report", report);

module.exports = router;
