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
    });

};
