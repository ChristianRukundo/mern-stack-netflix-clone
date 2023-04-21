const jwt = require('jsonwebtoken');

 function VerifyToken(req, res, next) {
    const authHeaders = req.headers;
    if (authHeaders) {
        const token = authHeaders.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (error, user) => {
            if (error) res.status(401).json("The token is Invalid");
            req.user = user
            next();
        })
    } else {
        res.status(200).json("UnAuthnticated User");
    }
}
module.exports = VerifyToken