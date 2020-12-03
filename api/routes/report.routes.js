const express = require('express');
const reportRouter = express.Router();

// importing requied controllers
const {
  getTodayData,
  getWeeklyData,
  getMonthlyData,
} = require('../controllers/report.controllers');

// 1-> route to register an admin
// 1-> route to sign an admin into the app and get token
// 1-> route to register an employee
// 1-> route to sign an employee into the app and get token
reportRouter.get('/get_today', getTodayData);
reportRouter.post('/get_weekly', getWeeklyData);
reportRouter.post('/get_monthly', getMonthlyData);

module.exports = reportRouter;
