'use strict';

// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} represents the price in cents. Must be an integer.'
    }
  },
  stock: {
    type: Number,
    min: 0,
    required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value.'
    }
  },
  likes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  logs: {
    type: [{type : Schema.Types.ObjectId, ref: 'Log', select: false}],
    select: false
  }
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Product', ProductSchema);
