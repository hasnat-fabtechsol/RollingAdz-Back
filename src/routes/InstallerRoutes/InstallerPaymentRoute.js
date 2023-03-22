const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const InstallerPaymentModel = mongoose.model("InstallerPayment");

const router = express.Router();

router.post("/", upload.single("w9_document"), async (req, res) => {
  try {
    const imageUrl = await uploadFile(req.file.path);
    req.body.w9_document = imageUrl;
    const installerPayment = new InstallerPaymentModel(req.body);
    await installerPayment.save();
    res.send(installerPayment);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const allAccounts = await InstallerPaymentModel.find({});
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await InstallerPaymentModel.findOneAndUpdate(
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
    const updatedDoc = await InstallerPaymentModel.findOneAndDelete({
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
