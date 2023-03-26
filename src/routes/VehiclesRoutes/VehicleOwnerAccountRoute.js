const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclesOwnerModel = mongoose.model("VehiclesOwner");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

// Update or create vehicle owner registration data
router.put(
  "/",
  requireAuth,
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
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
      const register = await VehiclesOwnerModel.findOne({ user: _id }).populate(
        "user"
      );
      if (register) {
        register.set({
          ...req.body,
          user_images: updateData,
          user: _id,
        });
        await register.save();
        res.send(register.toJSON({ password: 0 }));
      } else {
        const owerRegister = new VehiclesOwnerModel({
          ...req.body,
          user_images: updateData,
          user: _id,
        });
        await owerRegister.save();
        res.send(owerRegister.toJSON({ password: 0 }));
      }
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

router.get("/", requireAuth, async (req, res) => {
  var { _id } = req.user;
  VehiclesOwnerModel.find({ user: _id })
    .populate("user", { password: 0 })
    .exec(function (err, vehiclesOwner) {
      if (err) throw err;
      res.send(vehiclesOwner);
    });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclesOwnerModel.findOneAndDelete({ _id: id });

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
