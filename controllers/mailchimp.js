const axios = require('axios');
const cloudinary = require('../utils/cloudinary')
const { ErrorResponse } = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

require('dotenv').config();
exports.subscribeToMailchimp = async (email) => {
    let result = false;
    let error = null
    try {
      const response = await axios.post(
        'https://us21.api.mailchimp.com/3.0/lists/10cbf57e44/members',
        {
          email_address: email,
          status: 'subscribed',
        },
        {
          auth: {
            username: 'anystring',
            password: process.env.MAILCHIMP_API_KEY,
          },
        }
      );
  
      // Handle the success response
      result = true
    } catch (errors) {
      // Handle the error response
        error= errors
      console.error('Failed to add email to Mailchimp:', errors);
    }
    return { result, error }
};

exports.uploadImage = asyncHandler(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new ErrorResponse('Please upload an image', 400));
  }
  const uploadResponse = await cloudinary.uploader.upload(file.path, {
    upload_preset: 'article_images',
  });
  res.status(200).json({ success: true, image_url: uploadResponse.secure_url });
});