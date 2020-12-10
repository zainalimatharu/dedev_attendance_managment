// importing required modules & packages
const express = require('express');
const authRouter = express.Router();

// importing requied controllers
const { login } = require('../controllers/auth.controllers');

// 1-> route to sign into the app and get token
authRouter.post('/login', login);
authRouter.post('/logout');

module.exports = authRouter;
