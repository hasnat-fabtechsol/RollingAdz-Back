const express = require("express");
const mongoose = require("mongoose");
const CartModel = mongoose.model("Cart");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const Cart = new CartModel({
      ...req.body,
      user: _id,
    });
    await Cart.save();
    res.send(Cart);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const Cart = await CartModel.findOne({ user: req.user._id });
    res.json(Cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const Cart = await CartModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true } // return the updated document
    );

    if (!Cart) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.json(Cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const Cart = await CartModel.findOneAndDelete({
      _id: id,
    });

    if (!Cart) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.json(Cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
