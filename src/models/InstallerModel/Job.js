const mongoose = require("mongoose");

const photos = {
  // img: {
  //   type: String,
  //   required: true,
  // },
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
  },
};

const JobSchema = new mongoose.Schema({
  // install_type: {
  //   type: String,
  //   required: true,
  // },
  // url: {
  //   type: String,
  // },
  // name: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // phone_number: {
  //   type: Number,
  //   required: true,
  // },
  // mode_make: {
  //   type: String,
  //   required: true,
  // },
  // year: {
  //   type: Number,
  //   required: true,
  // },
  // lisence_plate: {
  //   type: String,
  //   required: true,
  // },
  // install_location: {
  //   type: String,
  //   required: true,
  // },
  // install_date: {
  //   type: String,
  //   required: true,
  // },
  // install_time: {
  //   type: String,
  //   required: true,
  // },
  // package_tracking_number: {
  //   type: Number,
  //   required: true,
  // },
  measure_side: {
    type: Boolean,
    required: true,
  },
  bleed_side: {
    type: Boolean,
    required: true,
  },
  art_work: {
    type: Boolean,
    required: true,
  },
  install_all_side: {
    type: Boolean,
    required: true,
  },
  rolling_adz_decale: {
    type: Boolean,
    required: true,
  },
  submit_photo_for_approval: {
    type: Boolean,
    required: true,
  },
  submit_photo_for_approval: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photos,
  url: {
    type: String,
  },
});

module.exports = mongoose.model("InstallerJob", JobSchema);
