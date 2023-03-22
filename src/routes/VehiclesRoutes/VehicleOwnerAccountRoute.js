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

router.get("/all", async (req, res) => {
  try {
    const allAccounts = await VehiclesOwnerModel.find({});
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclesOwnerModel.findOneAndUpdate(
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
    const updatedDoc = await VehiclesOwnerModel.findOneAndDelete(
      { _id: id },
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

module.exports = router;
