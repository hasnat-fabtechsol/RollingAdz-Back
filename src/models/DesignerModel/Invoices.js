const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("DesignerInvoices", InvoiceSchema);
