const moment = require('moment');

const calculateToday = () => {
  const now = new Date();
  const month = `0${now.getMonth() + 1}`.slice(-2);
  const day = `0${now.getDate()}`.slice(-2);
  const gt = `${now.getFullYear()}-${month}-${day}`;

  return gt;
};

const calculateWeek = () => {
  const now = moment().utc(true);
  let pastWeek = new Date(now.valueOf() - 7 * 24 * 60 * 60 * 1000);

  const month = `0${pastWeek.getMonth() + 1}`.slice(-2);
  const day = `0${pastWeek.getDate()}`.slice(-2);

  const gt = `${pastWeek.getFullYear()}-${month}-${day}`;

  return gt;
};

const calculateMonth = () => {
  const now = moment().utc(true);
  let monthStart = new Date(`${now.year()}-${now.month() + 1}`);

  const month = `0${monthStart.getMonth() + 1}`.slice(-2);
  const day = `0${monthStart.getDate()}`.slice(-2);

  const startDate = `${monthStart.getFullYear()}-${month}-${day}`;

  return { startDate, gt: monthStart };
};

module.exports = { calculateToday, calculateWeek, calculateMonth };
