const express = require("express");
const mongoose = require("mongoose");
const DesignerSettingModel = mongoose.model("DesignerSetting");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const DesignerSetting = new DesignerSettingModel(req.body);
    await DesignerSetting.save();
    res.send(DesignerSetting);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
