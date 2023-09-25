const express = require("express");
const BalanceController = require("../controllers/balanceController");
const { authInvestor } = require("../middlewares/auth");
const balance = express.Router();

balance
    .get("/", BalanceController.findAllBalance)
    .use(authInvestor)
    .post("/", BalanceController.createBalance)
    .get("/:balanceId", BalanceController.findBalance)
    .put("/status/:balanceId", BalanceController.updateStatusBalance) 
    .delete("/:balanceId", BalanceController.deleteBalance)

    
module.exports = balance;
