const express = require("express");
const mongoose = require("mongoose");
const DesignerInvoicesModel = mongoose.model("DesignerInvoices");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const DesignerInvoice = new DesignerInvoicesModel(req.body);
    await DesignerInvoice.save();
    res.send(DesignerInvoice);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
