const express = require("express");
const TransactionController = require("../controllers/transactionController");

const transaction = express.Router();

transaction
    .patch("/increments/:investorId", TransactionController.addTotaltransaction)
    .patch("/decrements/:investorId", TransactionController.minTotalTransaction)
    .post("/payments-token", TransactionController.midtransToken)
    
module.exports = transaction;
