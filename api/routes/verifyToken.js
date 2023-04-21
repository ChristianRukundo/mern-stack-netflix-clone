const jwt = require('jsonwebtoken');

 function VerifyToken(req, res, next) {
    const authHeaders = req.headers.token;
    if (authHeaders) {
        const token = authHeaders.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) res.status(401).json(error);
            req.user = user
            next();
        })
    } else {
        res.status(200).json("UnAuthenticated User");
    }
}
module.exports = VerifyToken