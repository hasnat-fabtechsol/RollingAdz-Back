const express = require("express");
const mongoose = require("mongoose");
const VehiclesSettingModel = mongoose.model("VehiclesSetting");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const vehicleSetting = new VehiclesSettingModel(req.body);
    await vehicleSetting.save();
    res.send(vehicleSetting);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
