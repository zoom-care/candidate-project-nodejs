var Joi = require('@hapi/joi');

const getCommentsForPostSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const deleteCommentSchema = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  getCommentsForPostSchema,
  deleteCommentSchema,
};
