const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = Schema({
  name: {
    type: String,
    set: function (value) {
      return value.toLowerCase().replace(' ', '_');
    },
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: true },
});

module.exports = Admin = mongoose.model('admin', adminSchema);
