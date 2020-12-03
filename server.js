// importing required packages & modules
const http = require('http');
const express = require('express');
const { connectDB } = require('./api/config/db');

// importing routes
const userRoutes = require('./api/routes/user.routes');
const authRoutes = require('./api/routes/auth.routes');
const durationRoutes = require('./api/routes/duration.routes');
const reportRoutes = require('./api/routes/report.routes');

// initializng express app
const app = express();

// connect database
connectDB();

// middleware for parsing req.body
app.use(express.json({ extended: false }));

// declare routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/duration', durationRoutes);
app.use('/report', reportRoutes);

app.set('port', process.env.PORT || 8088);

const server = http.createServer(app);
server.listen(app.get('port'), () =>
  console.log(`Server started on port ${app.get('port')}`)
);
