'use strict';

var Item = require('../../models/item');
var Joi = require('joi');

module.exports = {
  validate: {
    params: {
      itemId: Joi.string().regex(/^[a-f0-9]{24}$/)
    }
  },
  handler: function(request, reply) {
    Item.findById(request.params.itemId, function(err, item) {
      item.isCompleted = !item.isCompleted;
      item.save(function() {
        reply.redirect('/items');
      });
    });
  }
};
