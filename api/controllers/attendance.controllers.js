// importing required packages and modules
const moment = require('moment');

// importing required models
const Attendance = require('../models/attendance.model');

// importing helper functions
const { calculateToday } = require('../helpers/calculateDuration');

// set the arrival time of a user
const setArrival = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { arrivalTime } = req.body;

    // if the person setting arrival time is logged in
    //  => he will be able to ste his arrival time.
    // Otherwise, a "Not authorized" message will be sent
    // Even admin can't set an employee's arrival time
    if (req.user.id === userId) {
      // if user has already set his arrival time,
      // he won't be able to set his arrival time again.
      // instead, will be given a response of 409; conflict
      let arrived = await Attendance.find({
        user: userId,
        arrivalTime: {
          // $lte: moment().utc(true).valueOf(),
          $lte: moment().endOf('day').utc(true),
          // $gte: moment(calculateToday()).utc(true).valueOf(),
          $gte: moment().startOf('day').utc(true),
        },
      });

      // res.json({
      //   arrived,
      //   startOfDay: moment().startOf('day').utc(true),
      //   endOfDay: moment().endOf('day').utc(true),
      // });

      if (arrived.length > 0)
        return res.status(409).json({ message: 'Arrival Time already set' });

      // if user has not already set his arrival time
      // set his arrival time by creating a document ni database
      let duration = new Attendance({
        user: userId,
        arrivalTime,
      });

      duratioan = await duration.save();
      res.status(201).json({
        message: 'Arrival time set',
        duration,
      });
    } else {
      return res.status(401).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const setDeparture = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { departureTime } = req.body;

    // if the person setting departure time is logged in
    //  => he will be able to ste his departure time.
    // Otherwise, a "Not authorized" message will be sent
    // Even admin can't set an employee's departure time
    if (req.user.id === userId) {
      const result = await Attendance.findOneAndUpdate(
        {
          user: userId,
          arrivalTime: {
            $lte: moment().endOf('day').utc(true),
            $gte: moment().startOf('day').utc(true),
          },
        },
        { departureTime: departureTime },
        { new: true }
      );

      // if the arrival time of a user has not been set yet
      // send a response of status of 409
      if (result === null) {
        return res.status(409).json({ message: 'Arrival time not set' });
      }

      res.status(200).json({
        message: 'Departure time set',
        data: {
          _id: result._id,
          user: result.user,
          arrivalTime: result.arrivalTime,
          departureTime: result.departureTime,
        },
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
  setArrival,
  setDeparture,
};
