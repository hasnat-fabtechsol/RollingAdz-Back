const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const InstallerPaymentModel = mongoose.model("InstallerPayment");

const router = express.Router();

router.post("/", upload.single("w9_document"), async (req, res) => {
  try {
    const imageUrl = await uploadFile(req.file.path);
    req.body.w9_document = imageUrl;
    const installerPayment = new InstallerPaymentModel(req.body);
    await installerPayment.save();
    res.send(installerPayment);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
