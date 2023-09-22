const express = require("express");
const FarmController = require("../controllers/farmsController");
const farm = express.Router();

farm.get('/', FarmController.getAllFarms)
farm.get('/my-farms', FarmController.getAllUserFarms);
farm.post('/',FarmController.addFarm)
farm.get('/:farmId',FarmController.getFarmById)
farm.get('/my-farms/:farmId',FarmController.getUserFarmById) // ini kayaknya g butuh si pake /farms/:id aja tp just in case
farm.delete('/my-farms/:farmId',)


module.exports = farm;
