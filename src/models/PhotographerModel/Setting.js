const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  app_notification: {
    type: Boolean,
    required: true,
    default: false,
  },
  email_notification: {
    type: Boolean,
    required: true,
    default: false,
  },
  communication: {
    type: Number,
    required: true,
  },
  professionalism: {
    type: Number,
    required: true,
  },
  quality: {
    type: Number,
    required: true,
  },
  timeliness: {
    type: Number,
    required: true,
  },
  complete_3photo_shoot: {
    type: Boolean,
    required: true,
    default: false,
  },
  complete_3video_shoot: {
    type: Boolean,
    required: true,
    default: false,
  },
  multi_vehicle_video: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("PhotographerSetting", SettingSchema);
