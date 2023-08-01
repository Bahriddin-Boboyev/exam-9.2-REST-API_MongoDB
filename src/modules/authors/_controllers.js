const express = require("express");
const httpValidator = require("../../shared/http-validator");
//
const addAuthors = require("./add-authors");
const editAuthors = require("./edit-authors");
const showAuthors = require("./show-authors");
const removeAuthors = require("./remove-authors");
const authorsList = require("./list-authors");
//
const {
  addAuthorsSchema,
  deleteAuthorsSchema,
  getAuthorsSchema,
  patchAuthorsSchema,
  showAuthorsSchema,
} = require("./_schemas");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddAuthors = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addAuthorsSchema);
    const result = await addAuthors(req.body);

    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAuthors = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getAuthorsSchema);
    const result = await authorsList({ ...req.query });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAuthor = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showAuthorsSchema);
    const result = await showAuthors({ id: req.params.id });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const patchAuthors = async (req, res, next) => {
  try {
    httpValidator({ params: req.params, body: req.body }, patchAuthorsSchema);

    const result = await editAuthors({ id: req.params.id, ...req.body });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteAuthors = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteAuthorsSchema);
    const result = await removeAuthors({ id: req.params.id });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddAuthors,
  patchAuthors,
  getAuthors,
  getAuthor,
  deleteAuthors,
};
