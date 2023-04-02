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
  complete_install: {
    type: Boolean,
    required: true,
    default: false,
  },
  complete_removal: {
    type: Boolean,
    required: true,
    default: false,
  },
  complete_training: {
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("InstallerSetting", SettingSchema);
