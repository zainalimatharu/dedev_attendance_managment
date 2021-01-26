// importing required modules & packages
const express = require('express');
const authRouter = express.Router();

// importing requied controllers
const loginController = require('../controllers/auth.controllers').login;

// importing required middlewares
const { validateBody } = require('../middlewares/validate');

// importing reuired validation joi schemas
const { authSchema } = require('../validation/schemas');

// 1-> route to sign into the app and get token
authRouter.post('/login', validateBody(authSchema), loginController);

module.exports = authRouter;
