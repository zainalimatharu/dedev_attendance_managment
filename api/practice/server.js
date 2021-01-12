const express = require('express');
const app = express();
const calendarRoutes = require('./GoogleCalendarAPI/routes');
const gmailRoutes = require('./GoogleGmailAPI/routes');

// middleware for parsing req.body
app.use(express.json({ extended: false }));

// initialize routes
app.use('/calendar', calendarRoutes);
app.use('/gmail', gmailRoutes);

app.listen(2526, () => console.log('Practice server running on port 2526'));
