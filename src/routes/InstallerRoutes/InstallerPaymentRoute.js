const express = require("express");
const mongoose = require("mongoose");
const InstallerPaymentModel = mongoose.model("InstallerPayment");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const installerPayment = new InstallerPaymentModel(req.body);
    await installerPayment.save();
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
