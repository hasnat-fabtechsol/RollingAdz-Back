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
});

const ScheduleSchema = new mongoose.Schema({
  events: [event],
});

module.exports = mongoose.model("PhotographerSchedule", ScheduleSchema);
