'use strict';

// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema that defines the structure for storing user data
const LogSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  _product: { type: Schema.Types.ObjectId, ref: 'Product' },
  created_at: { type: Date, default: Date.now }
}, { strict: false });

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Log', LogSchema);