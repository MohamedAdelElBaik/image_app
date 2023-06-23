const mongoose = require("mongoose");

const imageUpload = mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  arriveAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("imageUpload", imageUpload);
