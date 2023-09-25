const express = require("express");
const InvestController = require("../controllers/investController");
const invest = express.Router();

invest.get("/", InvestController.getInvest);
invest.post("/:id", InvestController.postInvest);
invest.get("/:id", InvestController.getInvestById);

module.exports = invest;
