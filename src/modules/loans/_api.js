const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const { postAddLoans, getLoan, getLoans } = require("./_controllers");

const router = express.Router();

router.post("/loan", isLoggedIn, postAddLoans);
router.get("/loan", isLoggedIn, getLoans);
router.get("/loan/:id", isLoggedIn, getLoan);

module.exports = router;
