const Joi = require('@hapi/joi');

const putPostSchema = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  putPostSchema,
};
