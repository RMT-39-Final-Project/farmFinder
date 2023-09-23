const express = require("express");
const FarmController = require("../controllers/farmsController");
const authorizeDeleteFarm = require("../middlewares/authorization");
const farm = express.Router();


farm.get('/', FarmController.getAllFarms);
farm.get('/:farmId', FarmController.getFarmById);
farm.get('/my-farms/:farmId', FarmController.getUserFarmById);
farm.get('/my-farms/farm', FarmController.getAllUserFarms); //route in kehalang sama '/' 
farm.post('/my-farms/farm', FarmController.addFarm);
farm.delete('/my-farms/:farmId', authorizeDeleteFarm, FarmController.deleteByFarmId);


farm.patch('/:farmId', FarmController.updateFarmStatus);

module.exports = farm;


