'use strict';

const express     = require('express'),
      router      = express.Router(),
      app         = express(),
      morgan      = require('morgan'),
      bodyParser  = require('body-parser'),
      db          = require('./config/database'),
      config      = require('./config/config');

//controllers
require('./app/controllers/tokens')(router);
require('./app/controllers/users')(router);

const port = process.env.PORT || 3000;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/api', router);

app.use(function(req, res) {
  res.status(404).json({url: req.originalUrl + ' not found'})
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'invalid token'});
  }
});

app.listen(port);
