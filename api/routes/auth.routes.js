// importing required modules & packages
const express = require('express');
const authRouter = express.Router();

// importing requied controllers
const loginController = require('../controllers/auth.controllers').login;

// importing required middlewares
const auth = require('../middlewares/auth');

// 1-> route to sign into the app and get token
authRouter.post('/login', loginController);

module.exports = authRouter;
