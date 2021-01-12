if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// importing required packages & modules
const http = require('http');
const express = require('express');
const { connectDB } = require('./api/config/db');

// importing routes
const userRoutes = require('./api/routes/user.routes');
const authRoutes = require('./api/routes/auth.routes');
const attendanceRoutes = require('./api/routes/attendance.routes');
const reportRoutes = require('./api/routes/report.routes');

// initializng express app
const app = express();

// connect database
connectDB();

// middleware for parsing req.body
app.use(express.json({ extended: false }));

// CORS - Cross Origin Resource Sharing error handling
app.use((req, res, next) => {
  //  in the second argument, we can specify a certain URL or a client
  //  e.g. trackthegerm.com to be able to access the API
  //  With this method, we can restrict web pages to get acces to our API,
  //  but tools like "Postman" can still access the API
  res.header('Access-Control-Allow-Origin', '*');
  //  here, in the second argument, we can specify headers which will be
  //  sent along the request
  res.header(
    'Access-Control-Allow-Headers',
    // 'Origin, X-Registration-With, Content-Type, Accept, Authorization',
    '*'
  );

  //  before every "POST" and "PUT" request, browser always first sends
  //  an "OPTIONS" request.
  //  "OPTIONS" request is just for finding out, what options we have
  if (req.method === 'OPTIONS') {
    req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// declare routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/reports', reportRoutes);

// set post
app.set('port', process.env.PORT || 6000);

// create server
const server = http.createServer(app);
server.listen(app.get('port'), () =>
  console.log(`Server started on port ${app.get('port')}`)
);
