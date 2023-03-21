const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclesDataModel = mongoose.model("VehiclesData");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "front_side", maxCount: 1 },
    { name: "rear_side", maxCount: 1 },
    { name: "driver_side", maxCount: 1 },
    { name: "passenger_side", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      let updateData = {};
      if (req.files) {
        for (let [key, value] of Object.entries(req.files)) {
          let result = await uploadFile(value[0]?.path);
          updateData = { ...updateData, [key]: result };
        }
      }
      const vehicleData = new VehiclesDataModel({
        ...req.body,
        VehiclesImages: updateData,
      });
      await vehicleData.save();
      res.send(vehicleData);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

module.exports = router;
