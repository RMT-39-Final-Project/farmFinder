const express = require("express");
const UserController = require("../controllers/usersController");
const users = express.Router();

users.get("/investor", UserController.findInvestor);
users.get("/investor/:id", UserController.findOneInvestor);
users.post("/investor/register", UserController.createInvestor);
users.post("/investor/login", UserController.loginInvestor);

users.get("/farmer/:id", UserController.findOneFarmer);
users.post("/farmer/register", UserController.createFarmer);
users.post("/farmer/login", UserController.loginFarmer);
users.patch("/farmer/:id", UserController.editStatusFarmer);

module.exports = users;
