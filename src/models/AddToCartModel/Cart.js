const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
  sart_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  radius: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  car: {
    type: Number,
    default: 0,
  },
  boxTruck: {
    type: Number,
    default: 0,
  },
  semiTruck: {
    type: Number,
    default: 0,
  },
  LedTruck: {
    type: Number,
    default: 0,
  },
  photoShoot: {
    type: Number,
    default: 0,
  },
  swarm: {
    type: Number,
    default: 0,
  },
  creativeChange: {
    type: Number,
    default: 0,
  },
  impression200k: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", Cart);
