// importing required modules and packages
const express = require('express');
const durationRouter = express.Router();

// importing requied controllers
const {
  setArrival,
  setDeparture,
} = require('../controllers/attendance.controllers');

// importing required middlewares
const auth = require('../middlewares/auth');

// 1-> set arrival time of a user (either be an employee or ad admin)
// 2-> set departure time of a user (either be an employee or ad admin)
durationRouter.post('/arrival/:userId', auth, setArrival);
durationRouter.post('/departure/:userId', auth, setDeparture);

module.exports = durationRouter;
