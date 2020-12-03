// importing required packages and modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing jwt Secret
const jwtSecret = require('../config/default.json').jwtSecret;

// importing required models
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

const addAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.findOne({ email });

    // if admin with email provided by client already exists, return a response of "Email already Exists"
    if (admin) {
      // status code "409" means => "conflict"
      return res.status(409).json({ message: 'Admin already exists' });
    }

    // if email is not already present in the database, proceed to register the admin
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    let newAdmin = new Admin({
      name,
      email,
      password: encryptedPassword,
    });

    newAdmin = await newAdmin.save();
    res.status(201).json({
      message: 'Admin created',
      createdAdmin: newAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const addEmployee = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
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
      admin: false,
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
  addAdmin,
  addEmployee,
};
