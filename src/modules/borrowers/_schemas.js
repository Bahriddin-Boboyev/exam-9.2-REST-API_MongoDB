const Joi = require("joi");

exports.addBorrowersSchema = {
  body: Joi.object({
    name: Joi.string().min(5).max(60).required(),
    address: Joi.string().min(5).max(30).required(),
    phone: Joi.string().min(5).max(30).required(),
  }),
};

exports.showBorrowersSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.getBorrowersSchema = {
  query: Joi.object({
    q: Joi.string(),
    filters: Joi.object({
      is_deleted: Joi.boolean(),
    }),
    sort: Joi.object({
      by: Joi.valid("full_name", "phone"),
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

exports.patchBorrowersSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string().min(5).max(60),
    address: Joi.string().min(5).max(30),
    phone: Joi.string().min(5).max(30),
  }),
};

exports.deleteBorrowersSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
