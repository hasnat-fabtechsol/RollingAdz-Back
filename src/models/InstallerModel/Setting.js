const mongoose = require("mongoose");

const rating = {
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
};

const certification = {
  complete_install: {
    type: Boolean,
    required: true,
  },
  complete_removal: {
    type: Boolean,
    required: true,
  },
  complete_training: {
    type: Boolean,
    required: true,
  },
};

const SettingSchema = new mongoose.Schema({
  app_notification: {
    type: Boolean,
    required: true,
  },
  email_notification: {
    type: Boolean,
    required: true,
  },
  rating,
  certification,
});

module.exports = mongoose.model("InstallerSetting", SettingSchema);
