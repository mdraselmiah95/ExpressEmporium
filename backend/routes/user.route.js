const express = require("express");
const { registerUser } = require("../controller/user.controller");
const { upload } = require("../multer");

const router = express.Router();

router.route("/create-user").post(upload.single("file"), registerUser);

module.exports = router;
