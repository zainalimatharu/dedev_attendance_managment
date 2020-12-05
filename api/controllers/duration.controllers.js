// importing required packages and modules
const moment = require('moment');

// importing required models
const Duration = require('../models/duration.model');

// importing helper functions
const { calculateToday } = require('../helpers/calculateDuration');

const setArrival = async (req, res, next) => {
  try {
    // res.json({
    //   dateToStore: moment().utc(true),
    //   datedefault: new Date(),
    // });
    // const now = new Date();
    // if (req.user.admin === true) {
    //   console.log(req.user);
    // } else {
    //   console.log('Not an admin');
    // }

    const { userId } = req.params;

    // if the person setting arrival time is logged in
    //  => he will be able to ste his arrival time.
    // Otherwise, a "Not authorized" message will be sent
    // Even admin can't set an employee's arrival time
    if (req.user.id === userId) {
      let arrived = await Duration.find({
        user: userId,
        arrivalTime: {
          $lte: moment().utc(true).valueOf(),
          $gte: moment(calculateToday()).utc(true).valueOf(),
        },
      });

      if (arrived.length > 0)
        return res.json({ message: 'Arrival Time already set' });

      let duration = new Duration({
        user: userId,
        arrivalTime: moment().utc(true),
        // arrivalTime: moment().utc(true),
        // arrivalTime: new Date(
        //   `${now.getFullYear}-${now.getMonth}-${now.getDay} GMT+5`
        // ),
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
    // let arrived = await Duration.find({
    //   user: userId,
    //   arrivalTime: {
    //     $lte: moment().utc(true).valueOf(),
    //     $gte: moment('2020-12-04').utc(true).valueOf(),
    //   },
    // });

    // if (arrived.length < 0) {
    //   return res.json({ message: 'Arrival time not set' });
    // }

    const { userId } = req.params;

    // if the person setting departure time is logged in
    //  => he will be able to ste his departure time.
    // Otherwise, a "Not authorized" message will be sent
    // Even admin can't set an employee's departure time
    if (req.user.id === userId) {
      const result = await Duration.findOneAndUpdate(
        {
          user: userId,
          arrivalTime: {
            $lte: moment().utc(true).valueOf(),
            $gte: moment(calculateToday()).utc(true).valueOf(),
          },
        },
        { departureTime: moment().utc(true) },
        { new: true }
      );

      if (result === null) {
        return res.json({ message: 'Arrival time not set' });
      }

      res.json({
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
    // write the logic
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  setArrival,
  setDeparture,
};
