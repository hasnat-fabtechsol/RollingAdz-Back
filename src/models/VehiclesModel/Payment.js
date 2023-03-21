const mongoose = require("mongoose");

const VehiclesPaymentSchema = new mongoose.Schema({
  account_holder_name: {
    type: String,
    required: true,
  },
  w9_document: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  routing_number: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bank_acount_number: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  ssn_ein: {
    type: Number,
    required: true,
  },
  zip_code: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("VehiclePayment", VehiclesPaymentSchema);
