// importing required packages and modules
const moment = require('moment');

// importing required models
const Duration = require('../models/duration.model');

// importing helper functions
const {
  calculateToday,
  calculateYMD,
} = require('../helpers/calculateDuration');

// A generic route which generates report between two time ranges
// when timestamps for minTimeRangeCheck and maxTimeRangeCheck
//  are passed from the client app.
const generateReport = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { maxTimeRangeCheck, minTimeRangeCheck, message } = req.body;
    if (req.user.id === userId || req.user.admin === true) {
      const arrived = await Duration.find({
        user: userId,
        arrivalTime: {
          $lte: moment(maxTimeRangeCheck).utc(true).valueOf(),
          $gte: minTimeRangeCheck,
        },
      }).select('-__v');

      // "message" is what to send in response
      // if no record is found between the given timestamps
      if (arrived.length < 1) {
        return res.status(404).json({ message });
      }

      res.status(200).json({
        count: arrived.length,
        duration: {
          startDate: calculateYMD(moment(minTimeRangeCheck).utc(true)),
          endDate: calculateToday(),
        },
        arrived,
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
  generateReport,
};
