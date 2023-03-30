const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  request_type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  // date_time: {
  //   type: String,
  //   required: true,
  // },
  // location: {
  //   type: String,
  //   required: true,
  // },
  // estimated_earning: {
  //   type: String,
  //   required: true,
  // },
  // availability: {
  //   type: String,
  //   required: true,
  // },
  // confirm: {
  //   type: Boolean,
  //   required: true,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("InstallerRequest", RequestSchema);
