const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclePaymentModel = mongoose.model("VehiclePayment");

const router = express.Router();

router.post("/", upload.single("w9_document"), async (req, res, next) => {
  try {
    const imageUrl = await uploadFile(req.file.path);
    req.body.w9_document = imageUrl;
    const vehiclePayemnt = new VehiclePaymentModel(req.body);
    await vehiclePayemnt.save();
    res.send(vehiclePayemnt);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
