var Joi = require('@hapi/joi');

const userPostSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  address: {
    street: Joi.string().required(),
    city: Joi.string().required(),
    zipcode: Joi.string().required(),
    geo: {
      lat: Joi.string().required(),
      lng: Joi.string().required()
    },
  },
  phoneNumbers: Joi.array().items(),
  website: Joi.string()
});

module.exports = {
  userPostSchema,
}
