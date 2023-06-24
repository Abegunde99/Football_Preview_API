const jwt = require('jsonwebtoken');
const { ErrorResponse } = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { UserModel } = require('../models');
require('dotenv').config();

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);
    req.user = user;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new ErrorResponse('Token has expired', 401));
    }

    return next(new ErrorResponse('Invalid token', 401));
  }
});
