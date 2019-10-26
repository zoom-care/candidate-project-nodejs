'use strict';

const authorizeRequest = (req, res, next) => {
    if(req.headers.authorization || ['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next();
    } else {
        return res.status(403).json("Unauthorized!");
    }
}

module.exports = authorizeRequest