const express = require("express");
const mongoose = require("mongoose");
const vehicleRequestModel = mongoose.model("vehicleRequest");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const vehicleRequest = new vehicleRequestModel(req.body);
    await vehicleRequest.save();
    res.send(vehicleRequest);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
