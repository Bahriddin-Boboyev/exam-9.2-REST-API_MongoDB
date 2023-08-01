const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postAddAuthors,
  deleteAuthors,
  getAuthor,
  getAuthors,
  patchAuthors,
} = require("./_controllers");

const router = express.Router();

router.post("/authors", isLoggedIn, postAddAuthors);
router.get("/authors", isLoggedIn, getAuthors);
router.get("/authors/:id", isLoggedIn, getAuthor);
router.patch("/authors/:id", isLoggedIn, patchAuthors);
router.delete("/authors/:id", isLoggedIn, deleteAuthors);

module.exports = router;
