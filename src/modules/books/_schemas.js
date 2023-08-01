const Joi = require("joi");

exports.addBooksSchema = {
  body: Joi.object({
    title: Joi.string().min(5).max(130).required(),
    copies: Joi.number().integer().required(),
    publisher: Joi.string().required(),
    author: Joi.string().required(),
  }),
};

exports.showBooksSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.getBooksSchema = {
  query: Joi.object({
    q: Joi.string(),
    filters: Joi.object({
      is_deleted: Joi.boolean(),
      publisher: Joi.string(),
      author: Joi.string(),
    }),
    sort: Joi.object({
      by: Joi.valid("copies"),
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

exports.patchBooksSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    title: Joi.string().min(5).max(130),
    copies: Joi.number().integer(),
    publisher: Joi.string(),
    author: Joi.string(),
  }),
};

exports.deleteBooksSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
