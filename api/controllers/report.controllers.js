// importing required packages and modules
const moment = require('moment');

// importing required models
const Duration = require('../models/duration.model');

// importing helper functions
const {
  calculateToday,
  calculateWeek,
  calculateMonth,
} = require('../helpers/calculateDuration');

// get an object which contains today's arrival and departure time
// of the person with id specified in params
const getTodayData = async (req, res, next) => {
  try {
    // res.json({
    // nowMS: moment().utc(true).valueOf(),
    // newString: new Date(1607078054750),
    // anotherOne: moment('2020-12-04').utc(true),
    // oneMore: new Date().getTime(),
    //   now: moment().utc(true),
    //   before: moment('2020-12-04').utc(true),
    // });

    const { userId } = req.params;
    if (req.user.id === userId || req.user.admin === true) {
      const arrived = await Duration.find({
        user: userId,
        arrivalTime: {
          $lte: moment().utc(true).valueOf(),
          $gte:
            // moment().utc(true).valueOf() -
            moment(calculateToday()).utc(true).valueOf(),
        },
      }).select('-__v');

      if (arrived.length < 0) {
        return res.json({ message: 'Not arrived yet' });
      }

      res.json(arrived[0]);
    } else {
      res.status(401).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// get an objects which contains this week's arrival and departure time
// of the person with id specified in params
const getLastWeekData = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req.user.id === userId || req.user.admin === true) {
      const lastWeekData = await Duration.find({
        user: userId,
        arrivalTime: {
          $lte: moment().utc(true).valueOf(),
          $gte: moment(calculateWeek()).utc(true).valueOf(),
        },
      }).select('-__v');

      if (lastWeekData.length < 0) {
        return res.json({ message: 'Not appeared in last week' });
      }

      res.status(200).json({
        count: lastWeekData.length,
        duration: {
          startDate: calculateWeek(),
          endDate: calculateToday(),
        },
        lastWeekData,
      });
    } else {
      res.status(401).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// get an objects which contains this months' arrival and departure time
// of the person with id specified in params
const getLastMonthData = async (req, res, next) => {
  try {
    // res.json({
    //   startDate: calculateMonth().startDate,
    //   gt: calculateMonth().gt,
    // });

    const { userId } = req.params;
    if (req.user.id === userId || req.user.admin === true) {
      const lastMonthData = await Duration.find({
        user: userId,
        arrivalTime: {
          $lte: moment().utc(true).valueOf(),
          // unlike above two methods, here i am using value for "$gte"
          //  as returned by "calculateMonth" method.
          // I am trying to save an extra operation; it is the first date of current monthl.
          // $gte: moment(calculateWeek()).utc(true).valueOf(),
          $gte: calculateMonth().gt,
        },
      }).select('-__v');

      if (lastMonthData.length < 0) {
        return res.json({ message: 'Not appeared in last month' });
      }

      res.status(200).json({
        count: lastMonthData.length,
        duration: {
          startDate: calculateMonth().startDate,
          endDate: calculateToday(),
        },
        lastMonthData,
      });
    } else {
      res.status(401).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  getTodayData,
  getLastWeekData,
  getLastMonthData,
};
