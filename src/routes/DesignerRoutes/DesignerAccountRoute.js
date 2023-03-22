const express = require("express");
const mongoose = require("mongoose");
const DesignerAccountModel = mongoose.model("DesignerAccount");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const DesignerRegister = new DesignerAccountModel(req.body);
    await DesignerRegister.save();
    res.send(DesignerRegister);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
