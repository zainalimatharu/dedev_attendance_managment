// importing required packages and modules

// importing required models
const Duration = require('../models/duration.model');

const setArrival = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let duration = new Duration({
      user: userId,
    });

    duratioan = await duration.save();
    res.status(201).json({
      message: 'Arrival time set',
      duration,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const setDeparture = async (req, res, next) => {
  try {
    // write the logic
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  setArrival,
  setDeparture,
};
