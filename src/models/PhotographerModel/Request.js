const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  date_time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  estimated_earning: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PhotographerRequest", RequestSchema);
