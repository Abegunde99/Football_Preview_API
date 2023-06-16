const mongoose = require('mongoose');

//load env vars
require('dotenv').config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}