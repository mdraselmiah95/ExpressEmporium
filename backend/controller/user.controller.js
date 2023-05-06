const path = require("path");
const User = require("../model/user.model");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

exports.registerUser =
  (upload.single("file"),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userEmail = await User.findOne({ email });

      if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
      };
      console.log(user);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
