'use strict';

// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema that defines the structure for storing user data
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [{
      type: String,
      enum: ['client', 'admin']
    }],
    default: ['client']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.name = function () {
  return this.first_name + ' ' + this.last_name;
}

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', UserSchema);