const express = require("express");
const mongoose = require("mongoose");
const VehiclesScheduleModel = mongoose.model("VehiclesSchedule");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const vehicleSchedule = new VehiclesScheduleModel(req.body);
    await vehicleSchedule.save();
    res.send(vehicleSchedule)

  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;