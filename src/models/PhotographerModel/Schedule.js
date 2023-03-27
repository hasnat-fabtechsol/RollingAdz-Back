const mongoose = require("mongoose");

const event = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date_time: {
    type: String,
    required: true,
  },
  flightLiner: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photoshoot: {
    type: String,
    required: true,
  },
});

const ScheduleSchema = new mongoose.Schema({
  events: [event],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("PhotographerSchedule", ScheduleSchema);
