const express = require("express");
const {
  registerUser,
  loginUser,
  activateUser,
} = require("../controller/user.controller");
const { upload } = require("../multer");

const router = express.Router();

router.route("/create-user").post(upload.single("file"), registerUser);
router.route("/activation").post(activateUser);
router.route("/activation/:token").post(activateUser);
router.route("/").post(activateUser);
router.route("/login-user").post(loginUser);

module.exports = router;
