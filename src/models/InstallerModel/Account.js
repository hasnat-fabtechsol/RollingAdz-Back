const mongoose = require("mongoose");

const InstallerAccountSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_website: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  shipping_address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  mobile_installer: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("InstallerAccount", InstallerAccountSchema);
