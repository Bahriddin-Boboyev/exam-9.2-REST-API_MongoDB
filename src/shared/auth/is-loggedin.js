const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { UnauthorizedError } = require("../errors");
const Admin = require("../../modules/admins/_Admin");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError("Unauthorized.");
    }

    const decoded = jwt.verify(token, config.jwt.secret, {
      ignoreExpiration: false,
    });

    const admin = await Admin.findById(decoded.user.id);

    if (!admin || admin.is_deleted) {
      throw new UnauthorizedError("Unauthorized.");
    }

    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error);
    next(new UnauthorizedError(error.message));
  }
};

module.exports = isLoggedIn;
