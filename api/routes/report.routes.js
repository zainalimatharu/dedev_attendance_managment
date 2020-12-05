// importing required modules & packages
const express = require('express');
const reportRouter = express.Router();

// importing middlewares
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// importing requied controllers
const {
  getTodayData,
  getLastWeekData,
  getLastMonthData,
} = require('../controllers/report.controllers');

// 1-> get a user's data of current day
// 2-> get s user's data starting from last 7 days to today
// 3-> get s user's data starting from starting of current month to today
reportRouter.get('/get_today/:userId', auth, getTodayData);
reportRouter.get('/get_lastweek/:userId', auth, getLastWeekData);
reportRouter.get('/get_lastmonth/:userId', auth, getLastMonthData);

module.exports = reportRouter;
