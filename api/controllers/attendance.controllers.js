// importing required packages and modules
const moment = require('moment');
const { google } = require('googleapis');
const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;
const twilioClient = require('twilio')(accountSid, authToken);

// specifying Calendar API scopes scopes
const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

// importing google auth function & initialize it
const googleAuth = require('../middlewares/googleAuth')(scopes);

// initializing & authorizing calendar
const calendar = google.calendar({ version: 'v3', auth: googleAuth });

// importing required schema models
const Attendance = require('../models/attendance.model');

// set the arrival time of a user
const setArrival = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { arrivalTime, userName } = req.body;

    const date = moment(arrivalTime).utc().startOf('day')._d;

    // check => if user has already set his arrival time
    if (req.user.id === userId) {
      let present = await Attendance.find({
        user: userId,
        date: {
          $lte: moment().endOf('day').utc(true),
          $gte: moment().startOf('day').utc(true),
        },
      });

      if (present.length > 0)
        return res.status(409).json({ message: 'Arrival Time already set' });

      // prepare "msg"
      const msg = `${userName} arrived at ${moment(arrivalTime)
        .utc()
        .format('hh:mm a')} on ${moment(date).utc().format('YYYY-MM-DD')}`;

      // create event
      const createdEvent = await calendar.events.insert({
        calendarId: process.env.calendarId,
        resource: {
          summary: msg,
          location: 'Golden Plaza, G.T Road, Gujranwala',
          description: 'This is the Arrival Time of a person',
          start: {
            dateTime: moment(arrivalTime).utc().subtract(5, 'hours'),
            timeZone: 'Asia/Karachi',
          },
          end: {
            dateTime: moment(arrivalTime).utc().add(4, 'hours'),
            timeZone: 'Asia/Karachi',
          },
        },
      });

      // if user has not already set his arrival time
      // set his arrival time by creating a document in the database
      let duration = new Attendance({
        user: userId,
        eventId: createdEvent.data.id,
        arrivalTime,
        date,
        leave: false,
        absent: false,
        status: 'pending',
      });

      let attendance = await duration.save();

      // send a twilio message
      let sms = await twilioClient.messages.create({
        body: msg,
        from: process.env.twilioFrom,
        to: process.env.twilioTo,
      });

      sms = sms.errorMessage === null ? 'sent' : 'could not send';

      // return success response
      res.status(201).json({
        message: 'Arrival time set',
        duration: attendance,
        sms,
        event: {
          eventId: createdEvent.data.id,
          status: createdEvent.data.status,
          link: createdEvent.data.htmlLink,
        },
      });
    } else {
      return res.status(401).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// set departure time of user
const setDeparture = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { departureTime, eventId, userName } = req.body;

    // check => if user has set his arrival time first
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

      if (result === null) {
        return res.status(409).json({ message: 'Arrival time not set' });
      }

      // prepare "msg"
      const msg = `${userName} arrived at ${moment(result.arrivalTime)
        .utc()
        .format('hh:mm a')} and departed at ${moment(result.departureTime)
        .utc()
        .format('hh:mm a')} on ${moment(result.date)
        .utc()
        .format('YYYY-MM-DD')}`;

      // update event
      const updatedEvent = await calendar.events.patch({
        calendarId: 'zainalimatharu@gmail.com',
        eventId: eventId,
        resource: {
          end: {
            dateTime: moment(departureTime).utc().subtract(5, 'hours'),
            timeZone: 'Asia/Karachi',
          },
        },
      });

      // send a twilio message
      let sms = await twilioClient.messages.create({
        body: msg,
        from: '+13179327240',
        to: '+923127237979',
      });

      sms = sms.errorMessage === null ? 'sent' : 'could not send';

      // return a success response
      res.status(200).json({
        message: 'Departure time set',
        data: {
          _id: result._id,
          user: result.user,
          arrivalTime: result.arrivalTime,
          departureTime: result.departureTime,
        },
        sms,
        event: {
          eventId: updatedEvent.data.id,
          status: updatedEvent.data.status,
          link: updatedEvent.data.htmlLink,
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
