const router = require("express").Router();
const Movies = require("../models/Movies");
const VerifyToken = require("./verifyToken");

router.post("/", VerifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movies(req.body);
    await newMovie
      .save()
      .then((movieDoc) => res.status(201).json(movieDoc))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(403).json("You are not allowed to see all users");
  }
});

router.put("/:id", VerifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    await Movies.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .then((updatedMovie) => res.status(200).json(updatedMovie))
      .catch((err) => res.status(400).json(err));
  } else {
    res.status(403).json("You are not allowed to see all users");
  }
});

router.delete("/:id", VerifyToken, async (req, res) => {
    if (req.user.isAdmin) {
      await Movies.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json("Movie deleted successfully"))
        .catch((err) => res.status(400).json(err));
    } else {
      res.status(403).json("You are not allowed to see all users");
    }
  });
  
module.exports = router;
