// importing required modules and packages
const express = require('express');
const durationRouter = express.Router();
const accountSid = 'AC27ac2917fd92753c99567783cd97f653';
const authToken = 'ee9f4ed53803c51cfa978f415775a07b';

// importing requied controllers
const {
  setArrival,
  setDeparture,
} = require('../controllers/attendance.controllers');

// importing required middlewares
const auth = require('../middlewares/auth');

// const { sendEmail, oauth2Client } = require('../mail/index');

// 1-> set arrival time of a user (either be an employee or ad admin)
// 2-> set departure time of a user (either be an employee or ad admin)
durationRouter.post('/arrival/:userId', auth, setArrival);
durationRouter.post('/departure/:userId', auth, setDeparture);

module.exports = durationRouter;
