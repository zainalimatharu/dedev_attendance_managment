// importing required modules and packages
const express = require('express');
const timeRouter = express.Router();

// importing requied controllers
const {
  setArrival,
  setDeparture,
} = require('../controllers/duration.controllers');

// importing required middlewares
const auth = require('../middlewares/auth');
// const isAdmin = require('../middlewares/isAdmin');

// 1-> set arrival time of a user (either be an employee or ad admin)
// 2-> set departure time of a user (either be an employee or ad admin)
timeRouter.post('/set_arrival/:userId', auth, setArrival);
timeRouter.patch('/set_departure/:userId', auth, setDeparture);

module.exports = timeRouter;
