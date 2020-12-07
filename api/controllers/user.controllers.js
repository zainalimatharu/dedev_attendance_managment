// importing required packages and modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing jwt Secret
const jwtSecret = require('../config/default.json').jwtSecret;

// importing required models
const User = require('../models/user.model');

// create an employee
const addEmployee = async (req, res, next) => {
  try {
    const { name, email, password, admin } = req.body;
    const user = await User.findOne({ email }).select('name email _id');

    // if user with email provided by client already exists => return a response
    if (user) {
      return res.status(409).json({ message: 'User already exists', user });
    }

    // if user with email provided by client doesn't already exists => proceed to add Employee
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    let newUser = new User({
      name,
      email,
      password: encryptedPassword,
      admin,
    });

    newUser = await newUser.save();
    res.status(201).json({
      message: 'Employee created',
      createdEmployee: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  addEmployee,
};
