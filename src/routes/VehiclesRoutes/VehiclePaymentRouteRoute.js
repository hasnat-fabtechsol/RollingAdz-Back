const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclePaymentModel = mongoose.model("VehiclePayment");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

router.post(
  "/",
  requireAuth,
  upload.single("w9_document"),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const imageUrl = await uploadFile(req.file.path);
      req.body.w9_document = imageUrl;
      const vehiclePayemnt = new VehiclePaymentModel({
        ...req.body,
        user: _id,
      });
      console.log(vehiclePayemnt, req.body);
      await vehiclePayemnt.save();
      res.send(vehiclePayemnt);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

router.get("/", requireAuth, async (req, res) => {
  var { _id } = req.user;
  VehiclePaymentModel.find({ user: _id })
    .populate("user", { password: 0 })
    .exec(function (err, vehiclesOwner) {
      if (err) throw err;
      console.log(vehiclesOwner);
      res.send(vehiclesOwner);
    });
});

router.get("/:id", requireAuth, async (req, res) => {
  var { id } = req.params;

  VehiclePaymentModel.findOne({ _id: id })
    .populate("user", { password: 0 })
    .exec(function (err, vehiclesOwner) {
      if (err) throw err;
      console.log(vehiclesOwner);
      res.send(vehiclesOwner);
    });
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclePaymentModel.findOneAndUpdate(
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

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclePaymentModel.findOneAndDelete({
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
