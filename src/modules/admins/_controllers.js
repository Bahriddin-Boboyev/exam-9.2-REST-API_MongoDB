const express = require("express");
const httpValidator = require("../../shared/http-validator");
const hasRole = require("../../shared/auth/is-supper-admin");
const addAdmin = require("./add-admin");
const loginAdmin = require("./login-admin");
const editAdmin = require("./edit-admin");
const editMe = require("./edit-me");
const showAdmin = require("./show-admin");
const removeAdmin = require("./remove-admin");
//
const {
  loginAdminSchema,
  addAdminSchema,
  deleteAdminSchema,
  patchAdminSchema,
  patchMeSchema,
  showAdminSchema,
  getAdminsSchema,
} = require("./_schemas");
const adminList = require("./list-admin");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddAdmin = async (req, res, next) => {
  try {
    hasRole(req, res, next);
    httpValidator({ body: req.body }, addAdminSchema);
    const result = await addAdmin(req.body);

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
const postLoginAdmin = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, loginAdminSchema);

    const result = await loginAdmin(req.body);

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
const getAdmins = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getAdminsSchema);
    const result = await adminList({ ...req.query });

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
const getAdmin = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showAdminSchema);
    const result = await showAdmin({ id: req.params.id });

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
const patchMe = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchMeSchema);

    const result = await editMe({ id: req.user.id, ...req.body });

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
const patchAdmin = async (req, res, next) => {
  try {
    hasRole(req, res, next);
    httpValidator({ params: req.params, body: req.body }, patchAdminSchema);

    const result = await editAdmin({ id: req.params.id, ...req.body });

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
const deleteAdmin = async (req, res, next) => {
  try {
    hasRole(req, res, next);
    httpValidator({ params: req.params }, deleteAdminSchema);
    const result = await removeAdmin({ id: req.params.id });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddAdmin,
  postLoginAdmin,
  patchMe,
  patchAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
};
