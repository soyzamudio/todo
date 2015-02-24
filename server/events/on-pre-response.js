'use strict';

var _ = require('lodash');

module.exports = function(server) {
  console.log('info', 'Intercepting onPreResponse');

  server.ext('onPreResponse', function(request, reply) {
    if (!request.response.source || !request.response.source.template) {
      return reply.continue();
    }

    var c = request.auth.credentials || {};
    var r = request.response.source.context || {};

    request.response.source.context =  _.merge(c, r);

    return reply.continue();
  });
};
