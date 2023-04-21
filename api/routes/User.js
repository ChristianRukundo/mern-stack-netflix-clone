const router = require("express").Router();
const User = require("../models/User");

router.get('/', (req, res) => {
    res.status(200).json("User Routes")
})


module.exports = router;
