// importing required modules & packages
const express = require('express');
const userRouter = express.Router();

// importing requied controllers
const addEmployeeController = require('../controllers/user.controllers')
  .addEmployee;
const getUserController = require('../controllers/user.controllers').getUser;
const updateUserController = require('../controllers/user.controllers')
  .updateUser;
const getUsersController = require('../controllers/user.controllers').getUsers;
const getUserByIdController = require('../controllers/user.controllers')
  .getUserById;

// importing reuired validation joi schemas
const { idValidationSchema } = require('../validation/schemas');

// importing middlewares
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const { validateBody, validateParams } = require('../middlewares/validate');

// 1-> route to register an employee
// 2-> route to get an employee
// 3-> route to get an employee by id
// 4-> route to get all employees
// 5-> route to update an employee
userRouter.post('/addEmployee', auth, isAdmin, addEmployeeController);
userRouter.get('/getUser', auth, getUserController);
userRouter.get(
  '/getUser/:userId',
  auth,
  validateParams(idValidationSchema),
  getUserByIdController
);
userRouter.get('/getUsers', auth, getUsersController);
userRouter.post(
  '/updateUser/:userId',
  auth,
  validateParams(idValidationSchema),
  updateUserController
);

module.exports = userRouter;
