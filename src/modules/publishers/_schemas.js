const Joi = require("joi");

exports.addPublishersSchema = {
  body: Joi.object({
    name: Joi.string().min(5).max(60).required(),
    address: Joi.string().min(5).max(30).required(),
    phone: Joi.string().min(5).max(30).required(),
  }),
};

exports.showPublishersSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.getPublishersSchema = {
  query: Joi.object({
    q: Joi.string(),
    filters: Joi.object({
      is_deleted: Joi.boolean(),
    }),
    sort: Joi.object({
      by: Joi.valid("name"),
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

exports.patchPublishersSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string().min(5).max(60),
    address: Joi.string().min(5).max(30),
    phone: Joi.string().min(5).max(30),
  }),
};

exports.deletePublishersSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
