const crypto = require('crypto');
const {ErrorResponse} = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const sendEmail = require('../utils/sendEmail');
const { UserModel } = require('../models');
const jwt = require('jsonwebtoken');

// @desc      Register user
// @route     POST /auth/register
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Create user
  const user = await UserModel.create({ firstName, lastName, email, password });

   //generate token
   const token = createToken(user._id);
   sendTokenResponse(token, 200, res);
});


// @desc      Login user
// @route     POST /auth/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

   //generate token
   const token = createToken(user._id);
   sendTokenResponse(token, 200, res);
});



// @desc      Log user out / clear cookie
// @route     GET /auth/logout
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
});


// @desc      Get current logged in user
// @route     GET /auth/me
exports.getMe = asyncHandler(async (req, res, next) => {
  //check for req.user
  if (!req.user) {
    return next(new ErrorResponse('there is no logged In user', 404));
  }
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});


// @desc      Update password
// @route     PUT /auth/updatepassword
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  //check if new password is same as old password
  if (req.body.currentPassword === req.body.newPassword) {
    return next(new ErrorResponse('New password cannot be same as old password', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

   //generate token
   const token = createToken(user._id);
   sendTokenResponse(token, 200, res);
});


// @desc      Forgot password
// @route     POST /auth/forgotpassword
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  //generate otp
  const otp = Math.floor(100000 + Math.random() * 900000);

  //hash otp
  const otpHash = crypto.createHash('sha256').update(otp.toString()).digest('hex');

  //set otp hash and otp expire
  user.otpHash = otpHash;
  user.otpExpire = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  //send otp to email
  const message = `You are receiving this email because you (or someone else) has requested to reset your password. Please enter this otp to reset your password:  ${otp}`;

 
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset otp',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.otpHash = undefined;
    user.otpExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

});


// @desc      Reset password
// @route     PUT auth/resetpassword
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //check for password and confirm password
  if (!req.body.password || !req.body.confirmPassword) {
    return next(new ErrorResponse('Please provide password and confirm password', 400));
  }

  //check if password and confirm password are same
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorResponse('Password and confirm password do not match', 400));
  }

  //check if otp is valid
  if (!req.body.otp) {
    return next(new ErrorResponse('Please provide otp', 400));
  }

  //get hashed otp
  const otpHash = crypto.createHash('sha256').update(req.body.otp.toString()).digest('hex');

  //get user by otp hash
  const user = await UserModel.findOne({
    otpHash,
    otpExpire: { $gt: Date.now() }
  });
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.otpHash = undefined;
  user.otpExpire = undefined;
  await user.save();
    
  //send email to user
  const message = `Your password has been changed successfully`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset successful',
      message
    });

  } catch (err) {
    console.log(err);
    return next(new ErrorResponse('Email could not be sent', 500));
  }

  //generate token
  const token = createToken(user._id);
  sendTokenResponse(token, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (token, statusCode, res) => {

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // httpOnly: false,
    // sameSite: 'none',
    // domain: process.env.DOMAIN 
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};