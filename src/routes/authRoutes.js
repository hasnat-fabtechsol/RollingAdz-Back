const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const dotenv = require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign(
      { name: user.name, email: user.email, userId: user._id },
      process.env.TOKEN_SECRET
    );

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

module.exports = router;
