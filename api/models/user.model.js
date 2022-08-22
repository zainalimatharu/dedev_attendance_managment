const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean },
  bio: { type: String },
  salary: { type: Number },
  skills: { type: [String] },
  image: { type: String },
  social: {
    github: { type: String },
    linkedIn: { type: String },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
