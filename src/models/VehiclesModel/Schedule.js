const mongoose = require("mongoose");

const event = new mongoose.Schema({
  color: {
    type: String,
  },
  date_time: {
    type: String,
  },
  title: {
    type: String,
  },
});

const ScheduleSchema = new mongoose.Schema({
  events: [event],
  vehicle_type: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("VehiclesSchedule", ScheduleSchema);
