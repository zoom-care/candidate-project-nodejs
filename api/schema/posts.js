const Joi = require('frisby').Joi

const schema = Joi.object({
    title: Joi.string()
        .min(2),
    body: Joi.string()
})

module.exports = schema
