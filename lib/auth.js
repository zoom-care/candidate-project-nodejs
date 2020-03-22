/**
 * Auth check
 *
 * Requirement: "When performing a mutation, ensure that all incoming requests for those
 *  routes contain an authorization header. The value of this header can be any non-empty
 *  string. If the request does not contain a header of authorization, respond with the
 *  appropriate HTTP status code."
 */

function auth(req, res, next) {
    if (typeof req.headers.authorization === 'string' && req.headers.authorization.length > 0) {
        return next();
    }

    res.status(401).send('authorization required');
}

module.exports = auth;
