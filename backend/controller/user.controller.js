const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name,
      email,
      password,
      avatar: fileUrl,
    };
    const newUser = await User.create(user);
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    if (!email || !password) {
      return next(new ErrorHandler("Please all the fields", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User Doesn't exists", 400));
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }
    res.status(201).json({
      user,
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
