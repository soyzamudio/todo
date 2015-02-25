'use strict';

module.exports = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    request.auth.session.clear();
    reply.redirect('/');
  }
};
