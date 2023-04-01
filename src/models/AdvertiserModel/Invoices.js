const mongoose = require("mongoose");

const AdvertiserInvoiceSchema = new mongoose.Schema({
  due_date: {
    type: String,
    required: true,
  },
  invoice_number: {
    type: Number,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("AdvertiserInvoices", AdvertiserInvoiceSchema);
