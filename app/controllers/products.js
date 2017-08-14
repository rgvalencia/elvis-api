'use strict';

const Product = require('../models/product'),
      util    = require('util'),
      guard   = require('express-jwt-permissions')({ permissionsProperty: 'scope' });

module.exports = router => {
  router.route('/products')
    .get(function (req, res) {
      Product.
        find({}).
        where('stock').gt(0). // indicates availability
        sort({ name: -1, likes: -1 }).
        select('name price stock created_at').
        exec(function(err, products) {
          if (err) {
            res.status(err.statusCode || 500).json(err);
          } else {
            res.json(products);
          }
        });
    })
    .post(function(req, res) {
      Product.create(req.body, function (err, product) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          res.json(product);
        }
      })
    });

  router.route('/products/:id')
    .get(function (req, res) {
      Product.findById(req.params.id, function(err, product) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          console.log(util.inspect(product, false, null))
          res.json(product);
        }
      });
    })
    .put(function (req, res) {
      Product.findOneAndUpdate({_id: req.params.id}, { stock: req.body.stock, price: req.body.price }, {new: true}, function(err, product) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          res.json(product);
        }
      });
    })
    .delete(function (req, res) {
      Product.remove({
        _id: req.params.id
      }, function(err, product) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          res.json({ message: 'Product successfully deleted' });
        }
      });
    });

};
