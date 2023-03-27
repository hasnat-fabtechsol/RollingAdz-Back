const mongoose = require("mongoose");

const DesignerAccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_address: {
    type: String,
    required: true,
  },
  company_website: {
    type: String,
    required: true,
  },
  company_rep_firstname: {
    type: String,
    required: true,
  },
  company_rep_lastname: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  account_payable_firstname: {
    type: String,
    required: true,
  },
  account_payable_lastname: {
    type: String,
    required: true,
  },
  account_payable_email: {
    type: String,
    required: true,
  },
  account_payable_phone_number: {
    type: Number,
    required: true,
  },
  access_email: {
    type: String,
    requied: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("DesignerAccount", DesignerAccountSchema);
