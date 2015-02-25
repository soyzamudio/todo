'use strict';

var Item = require('../../models/item');
var Joi = require('joi');
var _ = require('lodash');

module.exports = {
  validate: {
    payload: {
      title: Joi.string().required(),
      dueDate: Joi.date().required(),
      tags: Joi.string().required(),
      priority: Joi.string().required()
    }
  },
  handler: function(request, reply) {
    var tags = request.payload.tags;
    tags = tags.split(',');
    tags = tags.map(function(e) {
      return _.kebabCase(e.toLowerCase());
    });
    delete request.payload.tags;
    var item = new Item(request.payload);
    item.userId = request.auth.credentials._id;
    item.tags = tags;
    item.save(function() {
      reply.redirect('/items');
    });
  }
};
