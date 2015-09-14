'use strict';

var redis = require('../lib/redis');

/**
  Save badges to database
  @param {Array} badges
  @param {Function} callback
*/
exports.save = function(badges, callback) {

  if(!badges.length) {
    return callback(null, null);
  }

  var badge = badges.pop();
  redis.lpush('badges', JSON.stringify(badge), function(error){
    if(error) {
      return callback(error, null);
    }
    exports.save(badges, callback);
  });

};
