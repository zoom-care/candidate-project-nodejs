'use strict';

const Joi = require('@hapi/joi');

const schema = Joi.object({
    postId: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    body: Joi.string().required()
});

module.exports = {
    schema
}