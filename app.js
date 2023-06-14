const express = require('express');
require('dotenv').config();
const standingsRouter = require('./routes/standings');
const fixturesRouter = require('./routes/fixtures');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/standings', standingsRouter);
app.use('/fixtures', fixturesRouter);


module.exports = app;
