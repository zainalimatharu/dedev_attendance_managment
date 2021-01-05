// importing required modules & packages
const express = require('express');
const reportRouter = express.Router();

// importing middlewares
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// importing requied controllers
const {
  myTimeSheet,
  timeSheet,
  todayReport,
  customizedReport,
} = require('../controllers/report.controllers');

// 1-> route to get a user's data between two timestamps
// 2-> route to get all users data between two timestamps
reportRouter.post('/myTimeSheet/:userId', auth, myTimeSheet);
reportRouter.get('/timeSheet', auth, isAdmin, timeSheet);
reportRouter.get('/todayReport', auth, isAdmin, todayReport);
reportRouter.post('/customizedReport', auth, isAdmin, customizedReport);

module.exports = reportRouter;
