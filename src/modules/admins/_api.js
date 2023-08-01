const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postAddAdmin,
  postLoginAdmin,
  patchMe,
  patchAdmin,
  getAdmin,
  getAdmins,
  deleteAdmin,
} = require("./_controllers");

const router = express.Router();

router.post("/login", postLoginAdmin);
router.post("/admins", isLoggedIn, postAddAdmin);
router.get("/admins", isLoggedIn, getAdmins);
router.get("/admin/:id", isLoggedIn, getAdmin);
router.patch("/admins/me", isLoggedIn, patchMe);
router.patch("/admins/:id", isLoggedIn, patchAdmin);
router.delete("/admins/:id", isLoggedIn, deleteAdmin);

module.exports = router;
