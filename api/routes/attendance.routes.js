// importing required modules and packages
const express = require('express');
const durationRouter = express.Router();
const accountSid = 'AC27ac2917fd92753c99567783cd97f653';
const authToken = 'ee9f4ed53803c51cfa978f415775a07b';
const client = require('twilio')(accountSid, authToken);

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
durationRouter.post('/sendSms', async (req, res, next) => {
  try {
    const result = await client.messages.create({
      body: `Test message with twilio`,
      from: '+13179327240',
      to: '+923127237979',
    });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = durationRouter;
