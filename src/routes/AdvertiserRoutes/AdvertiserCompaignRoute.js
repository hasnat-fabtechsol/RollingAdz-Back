const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const AdvertiserCampaignModel = mongoose.model("AdvertiserCampaign");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();
router.post(
  "/",
  requireAuth,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "campaign_image", maxCount: 1 },
    { name: "current_report", maxCount: 1 },
    { name: "previous_reports", maxCount: 1 },
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
      const register = await AdvertiserCampaignModel.findOne({
        user: _id,
      }).populate("user", { password: 0 });

      const owerRegister = new AdvertiserCampaignModel({
        ...req.body,
        images: updateData,
        user: _id,
      });
      await owerRegister.save();
      res.send(owerRegister.toJSON({ password: 0 }));
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

router.get("/", requireAuth, async (req, res) => {
  const { _id } = req.user;
  // Get sorting criteria from frontend
  const sortField = req.query.sortField || "start_date";
  const sortDirection = req.query.sortDirection || "asc";

  // Construct sort object based on sorting criteria
  const sortObj = {};
  sortObj[sortField] = sortDirection === "asc" ? 1 : -1;

  // Get all campaigns sorted by the specified field and direction
  AdvertiserCampaignModel.find({ user: _id })
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await AdvertiserCampaignModel.findOneAndUpdate(
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
    const updatedDoc = await AdvertiserCampaignModel.findOneAndDelete({
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
