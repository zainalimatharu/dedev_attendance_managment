const express = require('express');
const timeRouter = express.Router();

// importing requied controllers
const {
  setArrival,
  setDeparture,
} = require('../controllers/duration.controllers');

// 1-> route to register an admin
// 1-> route to sign an admin into the app and get token
// 1-> route to register an employee
// 1-> route to sign an employee into the app and get token
timeRouter.post('/set_arrival', setArrival);
timeRouter.post('/set_departure', setDeparture);

module.exports = timeRouter;
