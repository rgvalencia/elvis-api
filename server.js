'use strict';

const express     = require('express');
const app         = express();
const morgan      = require('morgan');
const bodyParser    = require('body-parser');
const mongoose    = require('mongoose');

const config = require('./config');
const User   = require('./app/models/user');

const port = process.env.PORT || 3000;

mongoose.connect(config.db); // connect to database

mongoose.connection.on('error', error => {
  console.log('MongoDB connection has failed.');
})

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.json('Hello!');
});

app.listen(port);
