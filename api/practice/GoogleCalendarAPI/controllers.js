// importing required modules & packages
const moment = require('moment');
const { google } = require('googleapis');

// specifying Calendar API scopes scopes
const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

// importing google auth function and initialize it
const auth = require('../middlewares/googleAuth')(scopes);

// initializing & authorizing calendar
const calendar = google.calendar({ version: 'v3', auth });

// get list of all calendars
async function listCalendars(req, res, next) {
  try {
    const calendars = await calendar.calendarList.list();

    res.status(200).json({ calendars: calendars.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

// craete a new calendar
const insertCalender = async (req, res, next) => {
  try {
    const calender = await calendar.calendars.insert({
      resource: { summary: 'new calendar' },
    });

    res.status(200).json({ calendar: calender.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// create a new event in an already created calendar
const insertEvent = async (req, res, next) => {
  try {
    const createdEvent = await calendar.events.insert({
      calendarId: 'hdtd76i09me8mpgqh1ol0mh71s@group.calendar.google.com',
      resource: {
        start: {
          dateTime: moment().utc().startOf('day'),
          timeZone: 'Asia/Karachi',
        },
        end: {
          dateTime: moment().utc().endOf('day'),
          timeZone: 'Asia/Karachi',
        },
      },
    });

    res.status(200).json({ event: createdEvent.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// update an already created event
const updateEvent = async (req, res, next) => {
  try {
    const createdEvent = await calendar.events.patch({
      calendarId: 'hdtd76i09me8mpgqh1ol0mh71s@group.calendar.google.com',
      eventId: '2odjqqk0p47b2nj7guanvn59rk',
      resource: {
        summary: 'Meet Ammi Abu and brothers In sha Allah',
        location: 'V.P.O Jalhan 52125, Gujranwala',
        description: 'Return home on the weekend',
        start: {
          dateTime: moment().utc().startOf('day'),
          timeZone: 'Asia/Karachi',
        },
        end: {
          dateTime: moment().utc().endOf('day'),
          timeZone: 'Asia/Karachi',
        },
      },
    });

    res.status(200).json({ event: createdEvent.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  listCalendars,
  insertCalender,
  insertEvent,
  updateEvent,
};
