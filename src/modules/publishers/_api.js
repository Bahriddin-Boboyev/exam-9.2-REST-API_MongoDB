const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postAddPublishers,
  deletePublishers,
  getPublisher,
  getPublishers,
  patchPublishers,
} = require("./_controllers");

const router = express.Router();

router.post("/publishers", isLoggedIn, postAddPublishers);
router.get("/publishers", isLoggedIn, getPublishers);
router.get("/publishers/:id", isLoggedIn, getPublisher);
router.patch("/publishers/:id", isLoggedIn, patchPublishers);
router.delete("/publishers/:id", isLoggedIn, deletePublishers);

module.exports = router;
