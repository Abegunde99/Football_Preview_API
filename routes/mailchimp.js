const express = require('express');
const router = express.Router();

const {subscribeToMailchimp} = require('../controllers/mailchimp');

router.post('/subscribe', async (req, res) => { 
    const {email} = req.body
    const {result, error} = await subscribeToMailchimp(email)
    if (result) {
        res.status(200).json({success: true, message: 'Email added to Mailchimp'})
    } else {
        res.status(400).json({success: false, message: error})
    }
});


module.exports = router;