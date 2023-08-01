const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postAddBorrowers,
  deleteBorrowers,
  getBorrower,
  getBorrowers,
  patchBorrowers
} = require("./_controllers");

const router = express.Router();

router.post("/borrowers", isLoggedIn, postAddBorrowers);
router.get("/borrowers", isLoggedIn, getBorrowers);
router.get("/borrowers/:id", isLoggedIn, getBorrower);
router.patch("/borrowers/:id", isLoggedIn, patchBorrowers);
router.delete("/borrowers/:id", isLoggedIn, deleteBorrowers);

module.exports = router;
