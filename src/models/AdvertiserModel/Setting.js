const mongoose = require("mongoose");

const AdvertiserSettingSchema = new mongoose.Schema({
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
  push_notification: {
    type: Boolean,
    required: true,
    default: false,
  },
  email_report: {
    type: Boolean,
    required: true,
    default: false,
  },
  primary_color: {
    type: String,
  },
  secondery_color: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("AdvertiserSetting", AdvertiserSettingSchema);
