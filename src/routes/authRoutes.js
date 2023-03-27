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

// const express = require("express");
// const mongoose = require("mongoose");
// const Setting = mongoose.model("Setting");
// const requireAuth = require("../middlewares/requireAuth");
// const upload = require("../components/uploadMulter");
// const router = express.Router();
// const cloudinary = require("cloudinary").v2;
// ObjectId = require("mongodb").ObjectID;
// cloudinary.config({
//   cloud_name: "dinmm7dvx",
//   api_key: "657561951328716",
//   api_secret: "9hD-z00aOfulMXw7Y1Q5lpwnSF8",
// });
// const uploadFile = async (path) => {
//   const result = await cloudinary.uploader.upload(path, {
//     resource_type: "auto",
//   });
//   return result.secure_url;
// };
// router.put(
//   "/",
//   upload.fields([{ name: "poster_image" }, { name: "logo_image" }]),
//   async (req, res) => {
//     try {
//       var updateData = {};
//       for (let [key, value] of Object.entries(req.body)) {
//         if (value) updateData = { ...updateData, [key]: value };
//       }

//       if (req.files) {
//         for (let [key, value] of Object.entries(req.files)) {
//           let result = await uploadFile(value[0]?.path);
//           // updateData={...updateData,poster_image:result}
//           updateData = { ...updateData, [key]: result };
//         }
//         //
//       }
//       var data;
//       var oldData = await Setting.findOne();
//       if (oldData)
//         data = await Setting.findOneAndUpdate({}, updateData, { new: true });
//       else {
//         data = new Setting(updateData);
//         data.save();
//       }

//       res.send(data);
//     } catch (err) {
//       console.log(err.message);
//       return res.status(422).send(err.message);
//     }
//   }
// );

// router.get("/", async (req, res) => {
//   try {
//     const data = await Setting.findOne();

//     res.send(data);
//   } catch (err) {
//     console.log(err.message);
//     return res.status(422).send(err.message);
//   }
// });
// module.exports = router;
