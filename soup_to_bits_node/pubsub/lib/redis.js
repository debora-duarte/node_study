'use strict';

var redis = require('redis');
var client = redis.createClient();

client.on('error', function(error){
  throw error;
});

module.exports = client;