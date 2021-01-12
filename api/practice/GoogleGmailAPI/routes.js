const express = require('express');
const gmailRouter = express.Router();

// importing controllers
const { listMessages } = require('./controllers');

// routes
gmailRouter.get('/listMessages', listMessages);
// gmailRouter.post('/insertEvent', insertEvent);
// gmailRouter.patch('/updateEvent', updateEvent);
// gmailRouter.get('/getCalendersList', getCalendersList);

module.exports = gmailRouter;
