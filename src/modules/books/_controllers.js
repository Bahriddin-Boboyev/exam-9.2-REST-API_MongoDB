const express = require("express");
const httpValidator = require("../../shared/http-validator");
//
const addBooks = require("./add-books");
const editBooks = require("./edit-books");
const showBooks = require("./show-books");
const removeBooks = require("./remove-books");
const booksList = require("./list-books");
//
const {
  addBooksSchema,
  deleteBooksSchema,
  getBooksSchema,
  patchBooksSchema,
  showBooksSchema,
} = require("./_schemas");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddBooks = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addBooksSchema);
    const result = await addBooks(req.body);

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
const getBooks = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getBooksSchema);
    const result = await booksList({ ...req.query });

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
const getBook = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showBooksSchema);
    const result = await showBooks({ id: req.params.id });

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
const patchBooks = async (req, res, next) => {
  try {
    httpValidator({ params: req.params, body: req.body }, patchBooksSchema);

    const result = await editBooks({ id: req.params.id, ...req.body });

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
const deleteBooks = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteBooksSchema);
    const result = await removeBooks({ id: req.params.id });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddBooks,
  patchBooks,
  getBooks,
  getBook,
  deleteBooks,
};
