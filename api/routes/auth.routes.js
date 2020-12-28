// importing required modules & packages
const express = require('express');
const authRouter = express.Router();

// importing requied controllers
const { login, logout } = require('../controllers/auth.controllers');

// importing required middlewares
const auth = require('../middlewares/auth');

// 1-> route to sign into the app and get token
authRouter.post('/login', login);
authRouter.post('/logout', auth, logout);

module.exports = authRouter;
