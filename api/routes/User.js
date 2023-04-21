const router = require("express").Router();
const User = require("../models/User");
const VerifyToken = require('./verifyToken')

router.put('/:id', (req, res) => {
    if (req.body._id === req.params.id) {
        if (req.body.password) {
            
        }
    } else {
        res.status(403).json("You can update only your account")
    }
})


module.exports = router;
