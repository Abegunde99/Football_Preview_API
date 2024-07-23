const mongoose = require('mongoose');

//load env vars
require('dotenv').config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Abegunde99:${process.env.MONGO_PASSWORD}@cluster0.wkkuzg9.mongodb.net/Football_Preview`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}