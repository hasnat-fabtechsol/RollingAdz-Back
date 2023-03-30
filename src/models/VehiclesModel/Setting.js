const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  app_status: {
    type: Boolean,
  },
  location_service: {
    type: Boolean,
  },
  motion_service: {
    type: Boolean,
  },
  notification: {
    type: Boolean,
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
