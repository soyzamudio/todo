'use strict';

var Item = require('../../models/item');
var User = require('../../models/user');
var _ = require('lodash');
var moment = require('moment');
var changeNumber = require('../../views/helpers/changeNumber');
var paginate = require('../../views/helpers/paginate');
var sorting = require('../../views/helpers/sorting');

module.exports = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    if (!request.auth.credentials) {
      reply.view('templates/users/login');
    } else {
      var search = _.clone(request.query);

      var filter = {userId:request.auth.credentials._id};
      if(request.query.filter){
        filter[request.query.filter] = request.query.value;
      }

      var skip = request.query.skip || 0;
      var sort = request.query.sort || 'isCompleted, -dueDate';
      delete request.query.skip;
      if (request.query.limit) { delete request.query.limit; }
      delete request.query.sort;
      Item.find(filter).sort(sort).limit(5).skip(skip).exec(function(err, items) {
        Item.count({}, function(err, count) {
          count = Math.ceil(count / 5);
          reply.view('templates/general/home', {items:items, moment:moment, skip:skip, search:search, changeNumber:changeNumber, paginate:paginate, sorting:sorting});
        });
      });
    }
  }
};
