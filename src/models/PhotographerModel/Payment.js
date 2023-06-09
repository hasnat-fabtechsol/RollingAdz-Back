const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  account_holder_name: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  routing_number: {
    type: Number,
    required: true,
  },
  bank_acount_number: {
    type: String,
    required: true,
  },
  ssn_ein: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  w9_document: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("PhotographerPayment", PaymentSchema);
