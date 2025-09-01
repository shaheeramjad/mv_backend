const express = require("express");
const path = require("path");
const User = require("../models/user.js");
const { upload } = require("../multer.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/auth.js");
const {
  activationTemplate,
  congratulationsTemplate,
} = require("../utils/emailTemplates.js");

const userRouter = express.Router();

userRouter.post(
  "/create-user",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const userEmail = await User.findOne({ email });
      if (userEmail) {
        const fileName = req.file.filename;
        const fileUrl = `../uploads/${fileName}`;
        fs.unlink(fileUrl, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
        return next(new ErrorHandler("User already Exist"));
      }

      const fileName = req.file.filename;
      const fileUrl = path.join(fileName);

      const user = {
        name,
        email,
        password,
        avatar: {
          public_id: fileName,
          url: fileUrl,
        },
      };
      const activationToken = createActivationToken(user);
      const activationUrl = `http://localhost:5173/activation/${activationToken}`;
      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          html: activationTemplate({
            name: user.name,
            activationUrl,
            type: "user",
          }),
        });
        res.status(201).json({
          success: true,
          message: `Please check your email ${user.email} for activation link`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

userRouter.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
      try {
        await sendMail({
          email: email,
          subject: "Congratulations on your Account",
          html: congratulationsTemplate({ name: name, type: "user" }),
        });
        res.status(201).json({
          success: true,
          message: `Congratulations ${name}, Your Account Has Been Created Successfully!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
userRouter.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

userRouter.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//logout
userRouter.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = userRouter;
