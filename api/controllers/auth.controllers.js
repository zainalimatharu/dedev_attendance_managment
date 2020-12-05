// importing required packages and modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing jwt Secret
const jwtSecret = require('../config/default.json').jwtSecret;

// importing required models
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email }).select(
      'email password _id admin'
    );

    // if admin with the email provided by client does not exist => return a response
    if (!admin) {
      return res
        .status(404)
        .json({ message: 'Invalid Email & Password combination' });
    }

    // compare the provided password with the one stored in databse in encrypted (using bcrypt.js) format
    const isMatched = await bcrypt.compare(password, admin.password);
    if (!isMatched) {
      return res.status(404).json({
        message: 'Invalid Email & Password combination',
      });
    }

    // if the email & password matchs => generate a jwt token and return it
    jwt.sign(
      { email: admin.email, id: admin._id, admin: admin.admin },
      jwtSecret,
      { expiresIn: 60 * 60 * 1000 },
      (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .json({ message: 'Auth successful', admin: true, token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const loginEmployee = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).select('email password _id');

    // if user with the email provided by client app does not exist => return a response
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Invalid Email & Password combination' });
    }

    // compare the provided password with the one stored in databse in encrypted (using bcrypt.js) format
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({
        message: 'Invalid Email & Password combination',
      });
    }

    // if the email & password matchs => generate a jwt token and return it
    jwt.sign(
      { email: user.email, id: user._id },
      jwtSecret,
      { expiresIn: 60 * 60 * 1000 },
      (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .json({ message: 'Auth successful', admin: false, token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  loginAdmin,
  loginEmployee,
};
