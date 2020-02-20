var createError = require('http-errors');

module.exports = (req, res, next) => {
    if (["PUT", "POST", "DELETE", "PATCH"].includes(req.method) && !req.headers['authorization']) {
        next(createError(401, "Not Authorized"));
    }
    next();
};