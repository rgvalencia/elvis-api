'use strict';

const config = require('../../config/config'),
      util   = require('../helpers/util'),
      User   = require('../models/user'),
      jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports = router => {
  router.post('/auth/token', function(req, res) {
    User.findOne({
      email: req.body.email
    })
    .select('+password')
    .exec(function(err, user) {
      if (err) throw err;

      if (req.body.scope !== 'admin') {
        req.body.scope = 'client'
      }

      if (!user) {
        res.status(422).json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        if (util.decrypt(user.password) != req.body.password) {
          res.status(422).json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          res.json({
            token: jwt.sign({
              id: user._id,
              scope: req.body.scope
            }, config.secret, {
              expiresIn: '2h'
            })
          });
        }   

      }

    });
  });

};
