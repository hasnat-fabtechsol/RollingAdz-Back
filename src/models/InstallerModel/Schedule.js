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
  campaign_type: {
    type: String,
    required: true,
  },
  events: [event],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("InstallerSchedule", ScheduleSchema);
