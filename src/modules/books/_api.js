const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postAddBooks,
  deleteBooks,
  getBook,
  getBooks,
  patchBooks,
} = require("./_controllers");

const router = express.Router();

router.post("/books", isLoggedIn, postAddBooks);
router.get("/books", isLoggedIn, getBooks);
router.get("/books/:id", isLoggedIn, getBook);
router.patch("/books/:id", isLoggedIn, patchBooks);
router.delete("/books/:id", isLoggedIn, deleteBooks);

module.exports = router;
