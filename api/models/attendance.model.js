const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const attendanceSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: { type: Date, required: true },
  eventId: { type: String, required: true },
  arrivalTime: { type: Date },
  departureTime: { type: Date },
  leave: { type: Boolean },
  absent: { type: Boolean },
  status: { type: String }, // pending, verfied, denied
});

// attendanceSchema.pre('aggregate', (next, doc) => {

//   next();
// });

const Attendance = mongoose.model("workduration", attendanceSchema);

module.exports = Attendance;
