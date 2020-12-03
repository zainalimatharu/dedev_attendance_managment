const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/default.json').jwtSecret;

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ message: 'Not Authorized' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};
