const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");

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

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation?verify_account=${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }

    // const newUser = await User.create(user);
    // res.status(201).json({
    //   success: true,
    //   newUser,
    // });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "15m",
  });
};

exports.activeUserByToken = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { activationToken: req.params.token },
      { activated: true, activationToken: null }
    );
    if (!user) {
      return next(new ErrorHandler("Invalid activation token", 500));
      // return res.status(404).json({ message: "Invalid activation token" });
    }
    return res.status(200).json({ message: "Account activated successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// activate user
exports.activateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar } = newUser;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const verifyUser = await User.create({
      name,
      email,
      avatar,
      password,
    });
    sendToken(verifyUser, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
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
