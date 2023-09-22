const express = require("express");
const FarmController = require("../controllers/farmsController");
const farm = express.Router();

farm.get('/',(req, res) => {
  res.send('Hello World!')
})
farm.get('/:id',(req, res) => {
  res.send('Hello World!')
})
farm.post('/',(req, res) => {
  res.send('Hello World!')
})
farm.get('/my-farms',(req, res) => {
  res.send('Hello World!')
})
farm.get('/my-farms/:id',(req, res) => {
  res.send('Hello World!')
})
farm.delete('/my-farms/:id',(req, res) => {
  res.send('Hello World!')
})


module.exports = farm;
