const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  app_status: {
    type: Boolean,
    default: false,
  },
  location_service: {
    type: Boolean,
    default: false,
  },
  motion_service: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Boolean,
    default: false,
  },
  gps_device: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("VehiclesSetting", SettingSchema);
