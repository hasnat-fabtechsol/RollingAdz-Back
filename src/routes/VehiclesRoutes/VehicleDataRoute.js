const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclesDataModel = mongoose.model("VehiclesData");
const requireAuth = require("../../middlewares/requireAuth");
const User = mongoose.model("User");

const router = express.Router();

router.post(
  "/",
  requireAuth,
  upload.fields([
    { name: "front_side", maxCount: 1 },
    { name: "rear_side", maxCount: 1 },
    { name: "driver_side", maxCount: 1 },
    { name: "passenger_side", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
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
        user: _id,
      });
      await vehicleData.save();
      res.send(vehicleData);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);
router.get("/:id", async (req, res) => {
  var { id } = req.params;
  VehiclesDataModel.findOne({ _id: id })
    .populate("user", { password: 0 })
    .exec(function (err, vehiclesOwner) {
      if (err) throw err;
      console.log(vehiclesOwner);
      res.send(vehiclesOwner);
    });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclesDataModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true } // return the updated document
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.json(updatedDoc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclesDataModel.findOneAndDelete({
      _id: id,
    });

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.json(updatedDoc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
