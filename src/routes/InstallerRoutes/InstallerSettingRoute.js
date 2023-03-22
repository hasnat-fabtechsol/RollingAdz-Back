const express = require("express");
const mongoose = require("mongoose");
const InstallerSettingModel = mongoose.model("InstallerSetting");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const installerSetting = new InstallerSettingModel(req.body);
    await installerSetting.save();
    res.send(installerSetting);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
module.exports = router;
