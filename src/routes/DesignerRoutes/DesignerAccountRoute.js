const express = require("express");
const mongoose = require("mongoose");
const DesignerAccountModel = mongoose.model("DesignerAccount");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

router.put("/", requireAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const register = await DesignerAccountModel.findOne({ user: _id }).populate(
      "user"
    );
    console.log(register, "egister");
    if (register) {
      register.set({
        ...req.body,
        user: _id,
      });
      await register.save();
      res.send(register.toJSON({ password: 0 }));
    } else {
      const owerRegister = new DesignerAccountModel({
        ...req.body,
        user: _id,
      });
      await owerRegister.save();
      res.send(owerRegister.toJSON({ password: 0 }));
    }
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/", requireAuth, async (req, res) => {
  var { _id } = req.user;
  DesignerAccountModel.find({ user: _id })
    .populate("user", { password: 0 })
    .exec(function (err, designerAccount) {
      if (err) throw err;
      console.log(designerAccount);
      res.send(designerAccount);
    });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await DesignerAccountModel.findOneAndUpdate(
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
    const updatedDoc = await DesignerAccountModel.findOneAndDelete({
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
