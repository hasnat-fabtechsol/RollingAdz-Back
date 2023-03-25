const mongoose = require("mongoose");

const photos = {
  img: {
    type: String,
    required: true,
  },
  before: {
    type: String,
    required: true,
  },
  after: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
};

const JobSchema = new mongoose.Schema({
  install_type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  mode_make: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  lisence_plate: {
    type: String,
    required: true,
  },
  install_location: {
    type: String,
    required: true,
  },
  install_date: {
    type: String,
    required: true,
  },
  install_time: {
    type: String,
    required: true,
  },
  package_tracking_number: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photos,
});

module.exports = mongoose.model("InstallerJob", JobSchema);
