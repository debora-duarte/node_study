'use strict';

var _ = require('underscore');
var model = require('../models/badge');


//Send badges to model to be saved
exports.save = function(request, response, next){
  var badges = _.clone(request.body);

  model.save(badges, function(error, data){
    if (error) {
      return response.json(503, { data: data, error: true });
    }
    next();
  });
}

//Send badges to pub/sub socket in model
exports.send = function(request, response, next){
  next();
}