const express = require("express");
const httpValidator = require("../../shared/http-validator");
//
const addPublishers = require("./add-publishers");
const editPublishers = require("./edit-publishers");
const showPublishers = require("./show-publishers");
const removePublishers = require("./remove-publishers");
const publishersList = require("./list-publishers");
//
const {
  addPublishersSchema,
  deletePublishersSchema,
  getPublishersSchema,
  patchPublishersSchema,
  showPublishersSchema,
} = require("./_schemas");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddPublishers = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addPublishersSchema);
    const result = await addPublishers(req.body);

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
const getPublishers = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getPublishersSchema);
    const result = await publishersList({ ...req.query });

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
const getPublisher = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showPublishersSchema);
    const result = await showPublishers({ id: req.params.id });

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
const patchPublishers = async (req, res, next) => {
  try {
    httpValidator(
      { params: req.params, body: req.body },
      patchPublishersSchema
    );

    const result = await editPublishers({ id: req.params.id, ...req.body });

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
const deletePublishers = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deletePublishersSchema);
    const result = await removePublishers({ id: req.params.id });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddPublishers,
  patchPublishers,
  getPublishers,
  getPublisher,
  deletePublishers,
};
