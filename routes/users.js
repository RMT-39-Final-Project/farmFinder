const express = require("express");
const UserController = require("../controllers/usersController");
const users = express.Router();

users.get("/investor", UserController.findInvestor);
users.get("/investor/:id", UserController.findOneInvestor);
users.post("/investor/register", UserController.createInvestor);
users.post("/investor/login", UserController.loginInvestor);

module.exports = users;
