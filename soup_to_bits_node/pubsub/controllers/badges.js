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
    model.trim();
  });
};

//Send badges to pub/sub socket in model
exports.send = function(request, response, next){
  var badges = _.clone(request.body);

  model.send(badges, function(error, data){
    if (error) {
      return response.json(503, { data: data, error: true });
    }
    response.json(200, { error: null });
  });
};

/**
  Get 10 badges from model
*/
exports.get = function(request, response){
  model.get(function(error, data){
    if (error) {
      return response.json(503, { data: data, error: true });
    }
    response.json(200, data);
  });
};