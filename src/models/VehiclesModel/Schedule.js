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
  swarm: {
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
