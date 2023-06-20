const {ErrorResponse} = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const {UserModel} = require('../models');

// @desc      Get all users
// @route     GET /users
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await UserModel.find({});
  res.status(200).json({success: true, data: users});
});

// @desc      Get single user
// @route     GET /users/:id
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: user
  });
});


// @desc      Update user
// @route     PUT /users/:id
exports.updateUser = asyncHandler(async (req, res, next) => {
    //check if user exists
    const userExists = await UserModel.findById(req.params.id);
    if (!userExists) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Delete user
// @route     DELETE /users/:id
exports.deleteUser = asyncHandler(async (req, res, next) => {

    //check if user exists
    const userExists = await UserModel.findById(req.params.id);
    if (!userExists) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

  await UserModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

