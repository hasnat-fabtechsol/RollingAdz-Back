const mongoose = require("mongoose");

const VehiclesImages = {
  front_side: {
    type: String,
    required: true,
  },
  rear_side: {
    type: String,
    reuired: true,
  },
  driver_side: {
    type: String,
    required: true,
  },
  passenger_side: {
    type: String,
    required: true,
  },
};

const VehiclesDataSchema = new mongoose.Schema({
  VehiclesImages,
  liscience_plate: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  fuel_type: {
    type: String,
    required: true,
  },
  insurance_provider: {
    type: String,
    required: true,
  },
  policy_number: {
    type: Number,
    required: true,
  },
  route_type: {
    type: String,
    required: true,
  },
  vehicle_type: {
    type: String,
    required: true,
  },
  vehicle_size: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("VehiclesData", VehiclesDataSchema);
