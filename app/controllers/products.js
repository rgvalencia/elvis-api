'use strict';

const Product = require('../models/product'),
      Order = require('../models/order'),
      Log = require('../models/log'),
      Like = require('../models/like'),
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
          res.json(product);
        }
      });
    })
    .put(guard.check('admin'), function (req, res) {
      Product.findById(req.params.id, function (err, product) {
        if (err) return res.status(404).json(err);

        let log = new Log({
          _creator: req.user.id, // assign the _id from the user
          _product: product._id, // assign the _id from the product
          oldPrice: product.price,
          newPrice: req.body.price
        });

        product.stock = req.body.stock;
        product.price = req.body.price;
        product.save(function (err, updatedProduct) {
          if (err) return res.status(422).json(err);

          log.save(function (err, result) {
            if (err) return res.status(422).json(err);
            res.json(updatedProduct);
          });

        });
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

    router.post('/products/:id/like', guard.check('client'), function (req, res) {
      Product.findById(req.params.id, function(err, product) {
        if (err && err.name === 'CastError') {
          res.status(404).json({error: 'This product does not exist'});
        } else {
          Like.create({
            _creator: req.user.id, // assign the _id from the user
            _product: product._id // assign the _id from the product
          }, function (err, user) {
            if (err && err.code === 11000) {
              res.status(422).json({error: 'You have already like this product.'});
            }

            res.json();
          });
        }
      });
    });

    router.delete('/products/:id/dislike', guard.check('client'), function (req, res) {
      Like.findOne({
        _creator: req.user.id,
        _product: req.params.id
      }, function(err, like) {
        if (!like) return res.status(422).json({error: 'You can not give dislike to a product that you do not follow.'});
        like.remove();
        res.json();
      });
    });

    router.post('/products/:id/buy', guard.check('client'), function(req, res) {
      Product.findById(req.params.id, function(err, product) {
        if (err) return res.status(404).json({error: 'This product does not exist'});
        if (product.stock < 1) return res.status(422).json({error: 'This product is out of stock'});

        let order = new Order({
          _buyer: req.user.id,
          _product: product.id,
          unit_price: product.price,
          quantity: req.body.quantity,
          total: product.price * req.body.quantity,
          pay_type: req.body.pay_type
        });

        order.save(function (err) {
          if (err) return res.status(422).json({error: err.message});

          res.json(order);
        });
      });
    });

};
