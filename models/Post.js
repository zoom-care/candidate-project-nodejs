'use strict';

const Joi = require('@hapi/joi');

const schema = Joi.object({
    id: Joi.number(),
    userId: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required()
});

const form = (obj) => Object.assign({
    id: obj.id,
    userId: obj.userId,
    title: obj.title,
    body: obj.body 
});

module.exports = {
    schema,
    form
}