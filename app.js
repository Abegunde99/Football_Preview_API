const express = require('express');
require('dotenv').config({path: './config/.env'});

const app = express();

const PORT = process.env.PORT || 5000;



module.exports = app;
