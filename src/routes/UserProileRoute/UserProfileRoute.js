const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../../middlewares/requireAuth");
const User = mongoose.model("User");
const router = express.Router();

router.put("/", requireAuth, async (req, res) => {
  console.log(req.user, req.body);

  try {
    data = await User.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      {
        new: true,
      }
    );
    res.send(result);
  } catch (err) {
    return res.status(422).send({ error: "Not Found" });
  }
});

router.get("/", requireAuth, async (req, res) => {
  const { _id } = req.user;

  try {
    const allAccounts = await User.findOne({ user: _id });
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
