'use strict';

const express     = require('express');
const app         = express();
const mongoose    = require('mongoose');

const config = require('./config');
const User   = require('./app/models/user');

const port = process.env.PORT || 3000;

mongoose.connect(config.db); // connect to database

mongoose.connection.on('error', error => {
  console.log('MongoDB connection has failed.');
})

app.get('/', function(req, res) {
  res.json('Hello!');
});

app.listen(port);
