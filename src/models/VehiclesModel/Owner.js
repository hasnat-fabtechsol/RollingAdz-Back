const mongoose = require("mongoose");

const user_images = {
  img: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    required: true,
  },
};

const VehiclesOwnerAccountSchema = new mongoose.Schema({
  user_images,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("VehiclesOwner", VehiclesOwnerAccountSchema);
