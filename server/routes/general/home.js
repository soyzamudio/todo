'use strict';

var Item = require('../../models/item');
var User = require('../../models/user');
var _ = require('lodash');

module.exports = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    if (!request.auth.credentials) {
      reply.view('templates/users/login')
    } else {
      request.query.userId = request.auth.credentials._id;
      var limit = request.query.limit;
      var page = request.query.page - 1;
      var sort = request.query.sort;
      delete request.query.page;
      delete request.query.limit;
      delete request.query.sort
      Item.find(request.query).sort(sort).limit(limit).skip(page).exec(function(err, items) {
        reply.view('templates/general/home', {items:items});
      })
    }
  }
};
