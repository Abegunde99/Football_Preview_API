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
  console.log(user)
  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/auth/resetpassword/${resetToken}`;


  const message = `You are receiving this email because you (or someone else) has requested the reset of your password. Please make a PUT request to: \n\n ${resetUrl} `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent', resetToken });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

});

// @desc      Reset password
// @route     PUT auth/resetpassword/:resettoken
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //check for password and confirm password
  if (!req.body.password || !req.body.confirmPassword) {
    return next(new ErrorResponse('Please provide password and confirm password', 400));
  }

  //check if password and confirm password are same
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorResponse('Password and confirm password do not match', 400));
  }

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  
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


//@desc send otp to user email
//@route POST /auth/sendotp
//send otp to user email
exports.sendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return next(new ErrorResponse('Please provide an email', 400));
  }

  // Check for user
  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //generate otp
  const otp = Math.floor(100000 + Math.random() * 900000);
  
  //send otp to user email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message: `Your otp is ${otp}`
    });
  } catch (err) {
    return next(new ErrorResponse('Email could not be sent', 500));
  }

  //save otp to user
  user.otp = otp;
  user.otpExpire = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc verify otp
//@route POST /auth/verifyotp
//verify otp
exports.verifyOtp = asyncHandler(async (req, res, next) => { 
  try {
    const { email, otp } = req.body;

    // Validate email
    if (!email) {
      return next(new ErrorResponse('Please provide an email', 400));
    }

    // Validate otp
    if (!otp) {
      return next(new ErrorResponse('Please provide an otp', 400));
    }

    // Check for user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    //check if otp is valid
    if(user.otp !== parseInt(otp)) {
      return next(new ErrorResponse('Invalid otp', 401));
    }

    //check if otp is expired
    if (user.otpExpire < Date.now()) {
      return next(new ErrorResponse('Otp expired', 401));
    }

    //remove otp and otpExpire from user
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save({ validateBeforeSave: false });
    
    //generate token
    const token = createToken(user._id);
    sendTokenResponse(token, 200, res);
  } catch (err) {
    return next(new ErrorResponse('Something went wrong', 500));
  }
});



// Get token from model, create cookie and send response
const sendTokenResponse = (token, statusCode, res) => {

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
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
        expiresIn: '1h'
    });
};