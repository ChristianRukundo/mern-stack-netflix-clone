const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username: username,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SEC
      ).toString(),
      email: email,
    });

    newUser
      .save()
      .then((userDoc) => res.status(200).json(userDoc))
      .catch((err) => res.status(400).json(err.message));
  } catch (error) {
    res.json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    !user && req.status(401).json("Incorrect Credentials");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("Invalid credentials");

    let { password, ...info } = user._doc;
    const acessToken = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ ...info, acessToken });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  }
});

module.exports = router;
