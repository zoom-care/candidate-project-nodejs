'use strict';

const Joi = require('@hapi/joi');

const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        zipcode: Joi.string(),
        geo: Joi.object({
            lat: Joi.string(),
            lng: Joi.string()
        })
    }),
    phoneNumbers: Joi.array().items(Joi.string()),
    website: Joi.string()
});

const form = (obj) => Object.assign({
    id: obj.id,
    name: obj.name,
    username: obj.username,
    email: obj.email,
    address: obj.address,
    phoneNumbers: obj.phoneNumbers,
    website: obj.website
});

module.exports = {
    schema,
    form
}