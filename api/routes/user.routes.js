// importing required modules & packages
const express = require('express');
const userRouter = express.Router();

// importing requied controllers
const {
  addEmployee,
  getUser,
  getUserById,
  updateUser,
  getUsers,
} = require('../controllers/user.controllers');

// importing middlewares
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// 2-> route to register an employee
// 2-> route to register an employee
userRouter.post('/addEmployee', auth, isAdmin, addEmployee);
userRouter.get('/getUser', auth, getUser);
userRouter.get('/getUser/:userId', auth, getUserById);
userRouter.get('/getUsers', auth, getUsers);
userRouter.post('/updateUser/:userId', auth, updateUser);

module.exports = userRouter;
