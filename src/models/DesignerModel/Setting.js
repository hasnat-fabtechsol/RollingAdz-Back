const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  app_notification: {
    type: Boolean,
    required: true,
  },
  email_notification: {
    type: Boolean,
    required: true,
  },
  push_notification: {
    type: Boolean,
    required: true,
  },
  email_report: {
    type: Boolean,
    required: true,
  },
  primary_color: {
    type: String,
    required: true,
  },
  secondery_color: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DesignerSetting", SettingSchema);
