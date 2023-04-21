const router = require("express").Router();
const User = require("../models/User");
const VerifyToken = require("./verifyToken");
const CryptoJS = require("crypto-js");

router.put("/:id", VerifyToken, async (req, res) => {
  if (req.user.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SEC
      ).toString();

      try {
        User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
          .then((updatedUser) => {
            res.status(201).json(updatedUser);
          })
          .catch((err) => res.status(500).json(err));
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } else {
    console.log(req.user);
    res.status(403).json("You can update only your account");
  }
});

router.put("/:id", VerifyToken, async (req, res) => {
  if (req.user.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SEC
      ).toString();

      try {
        User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
          .then((updatedUser) => {
            res.status(201).json(updatedUser);
          })
          .catch((err) => res.status(500).json(err));
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } else {
    console.log(req.user);
    res.status(403).json("You can update only your account");
  }
});

router.delete("/:id", VerifyToken, async (req, res) => {
  if (req.user.userId === req.params.id || req.user.isAdmin) {
    try {
      User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json("User has been deleted"))
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can delete only  your account");
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/", VerifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        const query = req.query.new;
      try {
          const users = query ? await User.find().sort({_id: -1}).limit(10) : await User.find();

          res.status(200).json(users);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed to see all users");
    }
});
  

router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
