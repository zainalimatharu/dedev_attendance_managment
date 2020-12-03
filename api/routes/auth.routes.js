const express = require('express');
const authRouter = express.Router();

// importing requied controllers
const {
  loginAdmin,
  loginEmployee,
} = require('../controllers/auth.controllers');

// 1-> route to sign an admin into the app and get token
// 1-> route to sign an employee into the app and get token
authRouter.post('/login_admin', loginAdmin);
authRouter.post('/login_employee', loginEmployee);

module.exports = authRouter;
