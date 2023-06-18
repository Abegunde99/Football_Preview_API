const express = require('express');
const { register, login, logout, getMe, forgotPassword, resetPassword, updatePassword , sendOtp, verifyOtp} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatepassword',protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/sendotp', sendOtp);
router.post('/verifyotp', verifyOtp);

module.exports = router;