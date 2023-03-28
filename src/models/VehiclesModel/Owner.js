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
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
  },
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
  user_images,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("VehiclesOwner", VehiclesOwnerAccountSchema);
