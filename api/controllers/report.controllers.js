// importing required packages and modules
const moment = require('moment');

// importing required models
const Duration = require('../models/duration.model');

const getTodayData = async (req, res, next) => {
  try {
    // let today = await Duration.find({ arrivalTime: new Date('2020-12-03') });
    // if (today.length < 1) {
    //   return res.status(404).json({ message: 'Data not found' });
    // }
    // res.status(200).json(today);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getWeeklyData = async (req, res, next) => {
  try {
    // write the logic
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getMonthlyData = async (req, res, next) => {
  try {
    // write the logic
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  getTodayData,
  getWeeklyData,
  getMonthlyData,
};
