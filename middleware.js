const createError = require('http-errors');
const Joi = require('@hapi/joi');

exports.notFound = (req, res, next) => {
    next(createError(404, 'Page not found'));
}

exports.errorHandler = (err, req, res, next) => {
    return res.status(err.status).json({ message: err.message });
}

exports.checkAuthHeader = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // TODO: attach the user object to the req after proper auth checks
    next();
}

exports.validateSchema = (schema, req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        next(createError(404, 'Issues validating request body'))
    } else {
        next()
    }
}