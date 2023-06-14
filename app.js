const express = require('express');
require('dotenv').config();
const standingsRouter = require('./routes/standings');
const fixturesRouter = require('./routes/fixtures');
const articlesRouter = require('./routes/articles');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload({
//     useTempFiles: false,
//     limits: { fileSize: 50 * 1024 * 1024 },
// }))

//routes
app.use('/standings', standingsRouter);
app.use('/fixtures', fixturesRouter);
app.use('/articles', articlesRouter);


//error handler
const { errorHandler } = require('./middlewares/error');
app.use(errorHandler);


module.exports = app;
