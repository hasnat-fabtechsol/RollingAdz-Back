const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclesCampaignModel = mongoose.model("VehiclesCampaign");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");
const router = express.Router();

router.post(
  "/",
  requireAuth,
  upload.fields([
    { name: "campaign_img", maxCount: 1 },
    { name: "before_installation", maxCount: 1 },
    { name: "after_installation", maxCount: 1 },
    { name: "during_campaign", maxCount: 1 },
    { name: "after_removel", maxCount: 1 },
    { name: "special_events", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      console.log(_id, "id");
      let updateData = {};
      if (req.files) {
        for (let [key, value] of Object.entries(req.files)) {
          let result = await uploadFile(value[0]?.path);
          updateData = { ...updateData, [key]: result };
        }
      }
      const vehicleCampaign = new VehiclesCampaignModel({
        ...req.body,
        compaign_photos: updateData,
        user: _id,
      });
      await vehicleCampaign.save();
      res.send(vehicleCampaign);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

// router.get("/all", async (req, res) => {
//   // Get sorting criteria from frontend
//   const sortField = req.query.sortField || "start_date";
//   const sortDirection = req.query.sortDirection || "asc";

//   // Construct sort object based on sorting criteria
//   const sortObj = {};
//   sortObj[sortField] = sortDirection === "asc" ? 1 : -1;
//   console.log(sortObj);
//   // Get all campaigns sorted by the specified field and direction
//   VehiclesCampaignModel.find()
//     .sort(sortObj)
//     .exec((err, campaigns) => {
//       if (err) {
//         console.error(err);
//       } else {
//         // console.log(campaigns);
//       }
//     });
//   VehiclesCampaignModel.find().exec(function (err, vehiclesOwner) {
//     if (err) throw err;
//     // console.log(vehiclesOwner);
//     res.send(vehiclesOwner);
//   });
// });
router.get("/", async (req, res) => {
  // Get sorting criteria from frontend
  const sortField = req.query.sortField || "start_date";
  const sortDirection = req.query.sortDirection || "asc";

  // Construct sort object based on sorting criteria
  const sortObj = {};
  sortObj[sortField] = sortDirection === "asc" ? 1 : -1;

  // Get all campaigns sorted by the specified field and direction
  VehiclesCampaignModel.find()
    .sort(sortObj)
    .exec((err, campaigns) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching campaigns");
      } else {
        res.send(campaigns);
      }
    });
});

router.get("/:id", async (req, res) => {
  var { id } = req.params;

  VehiclesCampaignModel.findOne({ _id: id })
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
    const updatedDoc = await VehiclesCampaignModel.findOneAndUpdate(
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
    const updatedDoc = await VehiclesCampaignModel.findOneAndDelete({
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
