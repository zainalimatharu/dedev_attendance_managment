// importing required modules & packages
const express = require('express');
const reportRouter = express.Router();

// importing middlewares
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const { validateBody } = require('../middlewares/validate');

// importing requied controllers
const myTimeSheetController = require('../controllers/report.controllers')
  .myTimeSheet;
const todayReportController = require('../controllers/report.controllers')
  .todayReport;
const customizedReportController = require('../controllers/report.controllers')
  .customizedReport;

// importing reuired validation joi schemas
const { reportSchema } = require('../validation/schemas');

// 1-> route to get a user's data between two timestamps
// 2-> route to get all users today data
// 3-> route to get all users data between two timestamps
reportRouter.post(
  '/myTimeSheet/:userId',
  auth,
  validateBody(reportSchema),
  myTimeSheetController
);
reportRouter.get('/todayReport', auth, isAdmin, todayReportController);
reportRouter.post(
  '/customizedReport',
  auth,
  isAdmin,
  validateBody(reportSchema),
  customizedReportController
);

module.exports = reportRouter;
