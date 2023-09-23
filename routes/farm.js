const express = require("express");
const FarmController = require("../controllers/farmsController");
const authorizeDeleteFarm = require("../middlewares/authorization");
const farm = express.Router();


farm.get('/', FarmController.getAllFarms)
farm.get('/my-farms', FarmController.getAllUserFarms);
farm.post('/',FarmController.addFarm)
farm.get('/:farmId',FarmController.getFarmById)
farm.get('/my-farms/:farmId',FarmController.getUserFarmById) // ini kayaknya g butuh si bisa pake /farms/:id aja tp just in case
farm.delete('/my-farms/:farmId',authorizeDeleteFarm,FarmController.deleteByFarmId)
farm.patch('/farms/:id',FarmController.updateFarmStatus)


module.exports = farm;
