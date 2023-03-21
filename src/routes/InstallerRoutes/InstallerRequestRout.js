const express = require("express");
const mongoose = require("mongoose");
const InstallerRequestModel = mongoose.model("InstallerRequest");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const installerRequest = new InstallerRequestModel(req.body);
    await installerRequest.save();
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
module.exports = router;

