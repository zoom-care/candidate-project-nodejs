const Joi = require('frisby').Joi

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    username: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    email: Joi.string()
        .email(),
    address: Joi.object(), // generic for the time being
    phoneNumbers: Joi.array()
        .items(Joi.string()),
    website: Joi.string()
})

module.exports = schema
