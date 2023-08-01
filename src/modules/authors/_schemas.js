const Joi = require("joi");

exports.addAuthorsSchema = {
  body: Joi.object({
    name: Joi.string().min(5).max(60).required(),
  }),
};

exports.showAuthorsSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.getAuthorsSchema = {
  query: Joi.object({
    q: Joi.string(),
    filters: Joi.object({
      is_deleted: Joi.boolean(),
    }),
    sort: Joi.object({
      by: Joi.string(),
      order: Joi.valid("ASC", "DESC"),
    }),
    page: Joi.object({
      offset: Joi.number().integer(),
      limit: Joi.number().integer().when("offset", {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
    }),
  }),
};

exports.patchAuthorsSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string().min(5).max(60),
  }),
};

exports.deleteAuthorsSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
