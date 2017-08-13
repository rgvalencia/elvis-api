'use strict';

const crypto     = require('crypto');
const config     = require('../../config/config');
const algorithm  = 'aes-256-ctr';

//decrypt data(password)
function decrypt(password) {
  let decipher = crypto.createDecipher(algorithm, config.privateKey);
  let dec = decipher.update(password, 'hex', 'utf8');
  dec += decipher.final('utf8');
  
  return dec;
}

//encrypt data(password)
function encrypt(password) {
  let cipher = crypto.createCipher(algorithm, config.privateKey);
  let crypted = cipher.update(password, 'utf8', 'hex');
  crypted += cipher.final('hex');
  
  return crypted;
}

module.exports = {
  encrypt,
  decrypt
}