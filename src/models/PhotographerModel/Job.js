const mongoose = require("mongoose");

const photos = {
  device_vehicle_info_img: {
    type: String,
    required: true,
  },
  upload_photo: {
    type: String,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
};

const JobSchema = new mongoose.Schema({
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
  license_plate: {
    type: String,
    required: true,
  },
  num_of_vehicle: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  shoot_date: {
    type: String,
    required: true,
  },
  shoot_time: {
    type: String,
    required: true,
  },
  tracking_location: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photos,
});

module.exports = mongoose.model("PhotographerJob", JobSchema);
