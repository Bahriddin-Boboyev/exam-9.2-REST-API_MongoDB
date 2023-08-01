const express = require("express");
const httpValidator = require("../../shared/http-validator");
//
const addBorrowers = require("./add-borrowers");
const editBorrowers = require("./edit-borrowers");
const showBorrowers = require("./show-borrowers");
const removeBorrowers = require("./remove-borrowers");
const borrowersList = require("./list-borrowers");
//
const {
  addBorrowersSchema,
  deleteBorrowersSchema,
  getBorrowersSchema,
  patchBorrowersSchema,
  showBorrowersSchema,
} = require("./_schemas");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddBorrowers = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addBorrowersSchema);
    const result = await addBorrowers(req.body);

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
const getBorrowers = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getBorrowersSchema);
    const result = await borrowersList({ ...req.query });

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
const getBorrower = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showBorrowersSchema);
    const result = await showBorrowers({ id: req.params.id });

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
const patchBorrowers = async (req, res, next) => {
  try {
    httpValidator({ params: req.params, body: req.body }, patchBorrowersSchema);

    const result = await editBorrowers({ id: req.params.id, ...req.body });

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
const deleteBorrowers = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteBorrowersSchema);
    const result = await removeBorrowers({ id: req.params.id });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddBorrowers,
  patchBorrowers,
  getBorrowers,
  getBorrower,
  deleteBorrowers,
};
