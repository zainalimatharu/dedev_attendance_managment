const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const attendanceSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  arrivalTime: { type: Date, required: true },
  departureTime: { type: Date },
});

// attendanceSchema.pre('aggregate', (next, doc) => {
  
//   next();
// });

module.exports = Attendance = mongoose.model('workduration', attendanceSchema);
