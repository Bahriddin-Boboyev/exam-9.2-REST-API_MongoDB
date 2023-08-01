const express = require("express");
const httpValidator = require("../../shared/http-validator");
//
const addLoans = require("./add-loans");
const showLoan = require("./show-loans");
const loansList = require("./list-loans");
//
const {
  addLoansSchema,
  getLoansSchema,
  showLoansSchema,
} = require("./_schemas");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddLoans = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addLoansSchema);
    const result = await addLoans({ admin: req.user, data: req.body });

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
const getLoans = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getLoansSchema);
    const result = await loansList({ ...req.query });

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
const getLoan = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showLoansSchema);
    const result = await showLoan({ id: req.params.id });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddLoans,
  getLoans,
  getLoan,
};
