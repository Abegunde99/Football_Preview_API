const jwt = require('jsonwebtoken');
const {ErrorResponse} = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { UserModel } = require('../models');
require('dotenv').config()

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
console.log(req.cookies)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Algorithm used for verification
      const algorithm = 'HS512';
      
    // Verify token
    const decoded =  jwt.verify(token, process.env.JWT_SECRET, { algorithms: [algorithm] });
    console.log('got here', decoded)

    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (err) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});