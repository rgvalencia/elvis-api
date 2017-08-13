'use strict';

if (process.env.NODE_ENV === 'production') {
  //load data from environment variables
  module.exports = {
    host: process.env.host,
    db: process.env.db,
    secret: process.env.secret
  }
} else {
  //load data from development.json
  module.exports = require('./environments/development.json');
}