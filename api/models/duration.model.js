const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const durationSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  arrivalTime: { type: Date, default: Date.now() },
  departureTime: { type: Date },
});

module.exports = Duration = mongoose.model('workduration', durationSchema);
