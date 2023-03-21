const express = require("express");
const mongoose = require("mongoose");
const installerAccountModel = mongoose.model("InstallerAccount");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const installerRegister = new installerAccountModel(req.body);
    await installerRegister.save();
    res.send(installerRegister);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
