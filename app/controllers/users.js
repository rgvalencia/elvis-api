'use strict';

const util   = require('../helpers/util'),
      User   = require('../models/user'),
      config = require('../../config/config'),
      jwt    = require('express-jwt');

module.exports = router => {
  router
    .use(jwt({ secret: config.secret})
    .unless({ path: ['/api/users'] }));

  router.route('/users/:id')
    .get(function (req, res) {
      User.findById(req.params.id, function(err, user) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          res.json(user);
        }
      });
    })
    .put(function (req, res) {
      User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          res.json(user);
        }
      });
    });

  router.route('/users')
    .post(function(req, res) {
      req.body.password = util.encrypt(req.body.password)
      
      User.create(req.body, function (err, user) {
        if (err) {
          res.status(err.statusCode || 500).json(err);
        } else {
          user = user.toObject(); // swap for a plain javascript object instance

          delete user["password"];
        
          res.json(user);
        }
      })
    });

};
