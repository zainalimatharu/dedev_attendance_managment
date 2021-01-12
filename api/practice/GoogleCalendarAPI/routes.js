const express = require('express');
const calendarRouter = express.Router();

// importing controllers
const {
  listCalendars,
  insertCalender,
  insertEvent,
  updateEvent,
} = require('./controllers');

// routes
calendarRouter.post('/insertCalender', insertCalender);
calendarRouter.post('/insertEvent', insertEvent);
calendarRouter.patch('/updateEvent', updateEvent);
calendarRouter.get('/listCalendars', listCalendars);

module.exports = calendarRouter;
