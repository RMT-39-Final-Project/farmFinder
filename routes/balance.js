const express = require("express");
const BalanceController = require("../controllers/balanceController");
const balance = express.Router();

balance
    .get("/", BalanceController.findAllBalance)
    .post("/", BalanceController.createBalance)
    .get("/:balanceId", BalanceController.findBalance)
    .put("/status/:balanceId", BalanceController.updateStatusBalance)
    .patch("/increments/:balanceId", BalanceController.addTotalBalance)
    .patch("/decrements/:balanceId", BalanceController.minTotalBalance)
    .delete("/:balanceId", BalanceController.deleteBalance)
    .post("/payments-token", BalanceController.midtransToken)
module.exports = balance;
