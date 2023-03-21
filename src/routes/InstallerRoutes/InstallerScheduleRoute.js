const express = require("express");
const mongoose = require("mongoose");
const InstallerScheduleModel = mongoose.model("InstallerSchedule");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const installerSchedule = new InstallerScheduleModel(req.body);
    await installerSchedule.save();
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
