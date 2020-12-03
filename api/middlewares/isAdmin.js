const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/default.json').jwtSecret;

module.exports = function (req, res, next) {
  try {
    if (req.user.admin === true) {
      req.admin = true;
      next();
    } else {
      return res.status(401).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
