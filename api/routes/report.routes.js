// importing required modules & packages
const express = require('express');
const reportRouter = express.Router();

// importing middlewares
const auth = require('../middlewares/auth');

// importing requied controllers
const { generateReport } = require('../controllers/report.controllers');

// 1-> get a user's data between two timestamps
reportRouter.get('/get_report/:userId', auth, generateReport);

module.exports = reportRouter;
