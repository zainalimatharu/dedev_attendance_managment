// importing required packages and modules
const moment = require('moment');
const accountSid = 'AC27ac2917fd92753c99567783cd97f653';
const authToken = 'ee9f4ed53803c51cfa978f415775a07b';
const twilioClient = require('twilio')(accountSid, authToken);

// importing required models
const Attendance = require('../models/attendance.model');
const User = require('../models/user.model');

// set the arrival time of a user
const setArrival = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { arrivalTime } = req.body;

    const date = moment(arrivalTime).utc().startOf('day')._d;

    // if the person setting arrival time is logged in
    //  => he will be able to ste his arrival time.
    // Otherwise, a "Not authorized" message will be sent
    // Even admin can't set an employee's arrival time
    if (req.user.id === userId) {
      // if user has already set his arrival time,
      // he won't be able to set his arrival time again.
      // instead, will be given a response of 409; conflict
      let present = await Attendance.find({
        user: userId,
        date: {
          // $lte: moment().utc(true).valueOf(),
          $lte: moment().endOf('day').utc(true),
          // $gte: moment(calculateToday()).utc(true).valueOf(),
          $gte: moment().startOf('day').utc(true),
        },
      });

      if (present.length > 0)
        return res.status(409).json({ message: 'Arrival Time already set' });

      // if user has not already set his arrival time
      // set his arrival time by creating a document in the database
      let duration = new Attendance({
        user: userId,
        arrivalTime,
        date,
        leave: false,
        absent: false,
        status: 'pending',
      });

      let attendance = await duration.save();

      let user = await User.findById(userId).select('name email _id');

      attendance.user = user;

      let sms = await twilioClient.messages.create({
        body: `${user.name} arrived at ${moment(attendance.arrivalTime)
          .utc()
          .format('hh:mm a')} on ${moment(attendance.date)
          .utc()
          .format('YY-MM-DD')}`,
        from: '+13179327240',
        to: '+923127237979',
      });

      sms = sms.errorMessage === null ? 'sent' : 'could not send';

      res.status(201).json({
        message: 'Arrival time set',
        duration: attendance,
        sms,
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

      let user = await User.findById(result.user).select('name email _id');

      result.user = user;

      let sms = await twilioClient.messages.create({
        body: `${user.name} arrived at ${moment(result.arrivalTime)
          .utc()
          .format('hh:mm a')} and departed at ${moment(result.departureTime)
          .utc()
          .format('hh:mm a')} on ${moment(result.date)
          .utc()
          .format('YY-MM-DD')}`,
        from: '+13179327240',
        to: '+923127237979',
      });

      sms = sms.errorMessage === null ? 'sent' : 'could not send';

      res.status(200).json({
        message: 'Departure time set',
        data: {
          _id: result._id,
          user: result.user,
          arrivalTime: result.arrivalTime,
          departureTime: result.departureTime,
        },
        sms,
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
