'use strict';

// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('../models/product');

const OrderSchema = new Schema({
  _buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  _product: { type: Schema.Types.ObjectId, ref: 'Product' },
  unit_price: {
    type: Number,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} represents the price in cents. Must be an integer.'
    }
  },
  quantity: {
    type: Number, min: 1,
    required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value.'
    }
   },
  total: { type: Number },
  pay_type: {
    type: [{
      type: String,
      enum: ['check', 'credit_card']
    }],
    default: ['check']
  },
  created_at: { type: Date, default: Date.now }
});

OrderSchema.post('save', function(order) {
  Product.update({ _id: order._product }, { $inc: { stock: -order.quantity }}).exec();
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Order', OrderSchema);
