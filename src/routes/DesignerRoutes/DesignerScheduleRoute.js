const express = require("express");
const mongoose = require("mongoose");
const DesignerScheduleModel = mongoose.model("DesignerSchedule");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const DesignerSchedule = new DesignerScheduleModel(req.body);
    await DesignerSchedule.save();
    res.send(DesignerSchedule)
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;