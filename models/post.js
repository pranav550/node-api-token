const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Post", postSchema);
