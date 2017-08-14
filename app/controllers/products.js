'use strict';

const Product = require('../models/product'),
      util    = require('util'),
      guard   = require('express-jwt-permissions')({ permissionsProperty: 'scope' });

module.exports = router => {
  router.route('/products')
    .get(function (req, res) {

      let query = Product.find({});

      if (req.query.q) {
        query.where('name').equals(req.query.q);
      }

      query.where('stock').gt(0); // indicates availability
      query.sort({ name: -1, likes: -1 });
      query.select('name price stock created_at');
      query.exec(function(err, products) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          res.json(products);
        }
      });
    })
    .post(guard.check('admin'), function(req, res) {
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
    .put(guard.check('admin'), function (req, res) {
      Product.findOneAndUpdate({_id: req.params.id}, { stock: req.body.stock, price: req.body.price }, {new: true}, function(err, product) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          res.json(product);
        }
      });
    })
    .delete(guard.check('admin'), function (req, res) {
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
