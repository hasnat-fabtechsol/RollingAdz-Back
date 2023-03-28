const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middlewares/requireAuth");
const User = mongoose.model("User");
const dotenv = require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Must provide username and password" });
  }
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or username" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign(
      { name: user.name, email: user.email, userId: user._id },
      process.env.TOKEN_SECRET
    );

    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or username" });
  }
});
router.get("/user-info", requireAuth, async (req, res) => {
  console.log(req.user);

  try {
    const result = await User.findById(req.user._id, { password: 0 });

    res.send(result);
  } catch (err) {
    return res.status(422).send({ error: "Not Found" });
  }
});

module.exports = router;
