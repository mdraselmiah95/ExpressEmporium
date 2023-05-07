const express = require("express");
const { registerUser, loginUser } = require("../controller/user.controller");
const { upload } = require("../multer");

const router = express.Router();

router.route("/create-user").post(upload.single("file"), registerUser);
router.route("/login-user").post(loginUser);

module.exports = router;
