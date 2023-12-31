const express = require('express');
const router = express.Router();
const multer = require('../utils/multer')
const {protect} = require('../middlewares/auth')

const {subscribeToMailchimp, uploadImage} = require('../controllers/mailchimp');

router.post('/mailchimp/subscribe', async (req, res) => { 
    const {email} = req.body
    const {result, error} = await subscribeToMailchimp(email)
    if (result) {
        res.status(200).json({success: true, message: 'Email added to Mailchimp'})
    } else {
        res.status(400).json({success: false, message: error})
    }
});

router.post('/upload',protect, multer.single('image'),uploadImage);

module.exports = router;