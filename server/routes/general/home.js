'use strict';

module.exports = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    if (!request.auth.credentials) {
      reply.view('templates/users/login')
    } else {
      reply.view('templates/general/home');
    }
  }
};
