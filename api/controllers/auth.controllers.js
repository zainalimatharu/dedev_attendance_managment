// importing required packages and modules
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');

// importing secret keys
const jwtSecret = require('../config/default.json').jwtSecret;

// importing required mongodb schema models
const User = require('../models/user.model');

// importing reuired validation joi schemas
const { authSchema } = require('../validation/schemas');

// login user => admin or eomployee and generate jwt Token
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email.toString() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email & Password combination' });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        message: 'Invalid Email & Password combination',
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      admin: user.admin ? user.admin : false,
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 24 * 60 * 60 * 1000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ message: 'Auth successful', admin: payload.admin, token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  login,
};
