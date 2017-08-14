'use strict';

// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('../models/product');

const LikeSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  _product: { type: Schema.Types.ObjectId, ref: 'Product' },
  created_at: { type: Date, default: Date.now }
}, { strict: false });

LikeSchema.index({ _creator: 1, _product: 1}, { unique: true });

LikeSchema.post('save', function(doc) {
	Product.update({ _id: doc._product }, { $inc: { likes: 1 }}).exec();
});

/*
  There is no query hook for remove(), only for documents. If you set a 'remove' hook, it will be fired when you call myDoc.remove(), 
	not when you call MyModel.remove()
*/
LikeSchema.post('remove', function(doc) {
  Product.update({ _id: doc._product }, { $inc: { likes: -1 }}).exec();
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Like', LikeSchema);
