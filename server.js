'use strict';

const express     = require('express'),
      router      = express.Router(),
      app         = express(),
      jwt         = require('express-jwt'),
      morgan      = require('morgan'),
      bodyParser  = require('body-parser'),
      db          = require('./config/database'),
      util        = require('util'),
      config      = require('./config/config');

//controllers
require('./app/controllers/tokens')(router);
require('./app/controllers/users')(router);
require('./app/controllers/products')(router);

const port = process.env.PORT || 3000;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(jwt({ secret: config.secret}).unless(function(req) {
  return (
    req.originalUrl === '/api/products' && req.method === 'GET' ||
    req.originalUrl === '/api/users' && req.method === 'POST'
  );
}));

app.use('/api', router);

app.use(function(req, res) {
  res.status(404).json({url: req.originalUrl + ' not found'})
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: err.message});
  }
});

app.listen(port);
