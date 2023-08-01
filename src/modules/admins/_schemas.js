const Joi = require("joi");

exports.addAdminSchema = {
  body: Joi.object({
    full_name: Joi.string().min(5).max(60).required(),
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
  }),
};

exports.loginAdminSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.patchMeSchema = {
  body: Joi.object({
    full_name: Joi.string().min(5).max(60),
    username: Joi.string().min(5).max(30),
    password: Joi.string().min(5).max(30),
  }),
};

exports.showAdminSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.getAdminsSchema = {
  query: Joi.object({
    q: Joi.string(),
    filters: Joi.object({
      is_deleted: Joi.boolean(),
      is_super: Joi.boolean(),
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

exports.patchAdminSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    full_name: Joi.string().min(5).max(60),
    username: Joi.string().min(5).max(30),
    password: Joi.string().min(5).max(30),
  }),
};

exports.deleteAdminSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
