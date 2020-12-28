const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    set: function (value) {
      return value.toLowerCase().replace(' ', '_');
    },
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean },
  bio: { type: String },
  salary: { type: Number },
  skills: { type: [String] },
  image: { type: String },
});

module.exports = User = mongoose.model('user', userSchema);
