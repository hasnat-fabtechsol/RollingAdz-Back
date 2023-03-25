const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  app_status: {
    type: Boolean,
    required: true,
  },
  location_service: {
    type: Boolean,
    required: true,
  },
  motion_service: {
    type: Boolean,
    required: true,
  },
  notification: {
    type: Boolean,
    required: true,
  },
  gps_device: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("VehiclesSetting", SettingSchema);
