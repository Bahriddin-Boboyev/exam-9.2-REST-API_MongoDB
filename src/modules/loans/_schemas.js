const Joi = require("joi");

exports.addLoansSchema = {
  body: Joi.object({
    book: Joi.string().required(),
    borrower: Joi.string().required(),
    due_date: Joi.number().integer().required(),
  }),
};

exports.showLoansSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.getLoansSchema = {
  query: Joi.object({
    filters: Joi.object({
      admin: Joi.string(),
      book: Joi.string(),
    }),
    sort: Joi.object({
      by: Joi.valid("out_date", "due_date"),
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
