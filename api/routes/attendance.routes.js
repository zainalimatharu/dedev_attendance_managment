// importing required modules and packages
const express = require('express');
const durationRouter = express.Router();

// importing requied controllers
const setArrivalController = require('../controllers/attendance.controllers')
  .setArrival;
const setDepartureController = require('../controllers/attendance.controllers')
  .setDeparture;

// importing required middlewares
const auth = require('../middlewares/auth');

// 1-> set arrival time of a user (either be an employee or ad admin)
// 2-> set departure time of a user (either be an employee or ad admin)
durationRouter.post('/arrival/:userId', auth, setArrivalController);
durationRouter.post('/departure/:userId', auth, setDepartureController);

module.exports = durationRouter;
