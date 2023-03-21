const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclesOwnerModel = mongoose.model("VehiclesOwner");

const router = express.Router();

router.post("/", upload.single("image"), async (req, res, next) => {
  console.log(req.body, "test");
  try {
    const imageUrl = await uploadFile(req.file.path);
    req.body.image = imageUrl;
    const owerRegister = new VehiclesOwnerModel(req.body);
    await owerRegister.save();
    res.send(owerRegister);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
