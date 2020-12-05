const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const durationSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  arrivalTime: { type: Date, required: true },
  departureTime: { type: Date },
});

module.exports = Duration = mongoose.model('workduration', durationSchema);
