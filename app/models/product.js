'use strict';

// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema that defines the structure for storing user data
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: { 
    type: Number, 
    min: 1,
    required: true
  },
  stock: {
    type: Number,
    min: 1,
    required: true
  },
  likes: {
    type: Number,
    min: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Product', ProductSchema);