const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  token: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

module.exports = mongoose.model("User", userSchema);
