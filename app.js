const express = require('express');
require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const standingsRouter = require('./routes/standings');
const fixturesRouter = require('./routes/fixtures');
const articlesRouter = require('./routes/articles');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');


const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));


//routes
app.use('/standings', standingsRouter);
app.use('/fixtures', fixturesRouter);
app.use('/articles', articlesRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);


//error handler
const { errorHandler } = require('./middlewares/error');
app.use(errorHandler);


module.exports = app;
