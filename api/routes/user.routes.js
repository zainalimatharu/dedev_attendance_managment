// importing required modules & packages
const express = require('express');
const userRouter = express.Router();

// importing requied controllers
const { addEmployee } = require('../controllers/user.controllers');

// importing middlewares
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// 2-> route to register an employee
userRouter.post('/add_employee', auth, isAdmin, addEmployee);

module.exports = userRouter;
