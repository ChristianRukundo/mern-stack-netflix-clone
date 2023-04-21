const jwt = require('jsonwebtoken');

export function VerifyToken(req, res, next) {
    const authHeaders = req.headers;
    if (authHeaders) {
        const token = authHeaders.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (error, user) => {
            if (error) throw error;
        })
    } else {
        res.status(200).json("UnAuthnticated User");
    }
}