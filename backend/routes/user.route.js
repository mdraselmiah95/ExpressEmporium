const express = require("express");
const { registerUser, activateUser } = require("../controller/user.controller");
const { upload } = require("../multer");

const router = express.Router();

router.route("/create-user").post(upload.single("file"), registerUser);

module.exports = router;
