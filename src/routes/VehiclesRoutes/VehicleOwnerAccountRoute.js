const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclesOwnerModel = mongoose.model("VehiclesOwner");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

router.put(
  "/",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
  ]),
  requireAuth,
  async (req, res) => {
    try {
      var updateData = {};
      for (let [key, value] of Object.entries(req.body)) {
        if (value) updateData = { ...updateData, [key]: value };
      }

      if (req.files) {
        for (let [key, value] of Object.entries(req.files)) {
          let result = await uploadFile(value[0]?.path);
          updateData = { ...updateData, [key]: result };
        }
      }
      var data;
      var user;
      var oldData = await VehiclesOwnerModel.findOne({ user: req.user._id });
      if (oldData) {
        data = await VehiclesOwnerModel.findOneAndUpdate(
          { user: req.user._id },
          updateData,
          {
            new: true,
          }
        );
        user = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            firstname: data.firstname,
            lastname: data.lastname,
            password: data.password,
          },
          {
            new: true,
          }
        );
      } else {
        data = new VehiclesOwnerModel({ ...updateData, user: req.user._id });
        data.save();
        user = new User({
          _id: req.user._id,
          firstname: updateData.firstname,
          lastname: updateData.lastname,
          password: updateData.password,
        });
        await user.save();
      }

      res.send(data, user, { password: 0 });
    } catch (err) {
      console.log(err.message);
      return res.status(422).send(err.message);
    }
  }
);

router.get("/", requireAuth, async (req, res) => {
  const { _id } = req.user;

  try {
    const allAccounts = await VehiclesOwnerModel.findOne({
      user: req.user._id,
    });
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
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
