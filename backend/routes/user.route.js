const express = require("express");
const {
  registerUser,
  loginUser,
  activateUser,
  loadUser,
} = require("../controller/user.controller");
const { upload } = require("../multer");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/create-user").post(upload.single("file"), registerUser);
router.route("/activation").post(activateUser);
router.route("/login-user").post(loginUser);
router.route("/get-user").get(isAuthenticated, loadUser);

module.exports = router;
