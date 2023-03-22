const mongoose = require("mongoose");

const PhotographerAccountSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_website: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "PhotographerAccount",
  PhotographerAccountSchema
);
