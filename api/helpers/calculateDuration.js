const moment = require('moment');

//
const calculateYMD = (momentDateObject) => {
  const year = momentDateObject.year();
  const month = `0${momentDateObject.month() + 1}`.slice(-2);
  const day = `0${momentDateObject.date()}`.slice(-2);
  const YMD = `${year}-${month}-${day}`;

  return YMD;
};

//
const calculateToday = () => {
  const now = new Date();
  const month = `0${now.getMonth() + 1}`.slice(-2);
  const day = `0${now.getDate()}`.slice(-2);
  const gt = `${now.getFullYear()}-${month}-${day}`;

  return gt;
};

module.exports = {
  calculateToday,
  calculateYMD,
};
