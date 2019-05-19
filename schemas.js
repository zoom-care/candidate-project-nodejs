const Joi = require('@hapi/joi');

const addressSchema = Joi.object().keys({
   street: Joi.string().required(),
   city: Joi.string().required(),
   zipcode: Joi.string().regex(/^(\d+-?)+\d+$/).required(),
   geo: {
       lat: Joi.string().required(),
       lng: Joi.string().required()
   }
});

const createUser = Joi.object().keys({
    id: Joi.number().integer().required(),
    name: Joi.string().min(1).max(140).required(),
    username: Joi.string().min(1).max(140),
    email: Joi.string().email().required(),
    website: Joi.string().required(),
    phoneNumbers: Joi.array().items(Joi.string().min(1).max(140)).required(),
    address: addressSchema
});

const updatePost = Joi.object().keys({
    userId: Joi.number().integer().required(),
    id: Joi.number().integer().required(),
    title: Joi.string().required(),
    body: Joi.string().required()
});


module.exports = {
    createUser,
    updatePost
};