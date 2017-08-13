'use strict';

const mongoose    = require('mongoose');
const config      = require('./config');

mongoose.connect(config.db); // connect to database

mongoose.connection.on('error', error => {
  console.log('MongoDB connection has failed.');
})
mongoose.connection.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

module.exports = mongoose.connection;