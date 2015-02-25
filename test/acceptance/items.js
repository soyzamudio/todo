/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Item = require('../../server/models/item');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process')
var dbname = process.env.MONGO_URL.split('/')[3];

var cookie;

describe('items route', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd: __dirname + '/../scripts'}, function(err, stdout, stderr) {
      var options = {
        method:'post',
        url:'/users/authenticate',
        payload: {
          email: 'bilbo@theShire.com',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        done();
      });
    });
  });

  describe('get /items/new', function() {
    it('should display the new item', function(done) {
      var options = {
        method:'get',
        url:'/items/new',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.payload).to.include('New Item');
        done();
      });
    });
  });

  describe('post /items/create', function() {
    it('should create the new item', function(done) {
      var options = {
        method: 'post',
        url: '/items/create',
        headers: {
          cookie: cookie
        },
        payload: {
          title: 'Get ring to Mount Doom',
          dueDate: '2014-01-01',
          tags: 'ring, epic, blah blah',
          priority: 'high'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/items');
        done();
      });
    });

    it('should NOT create the new item - missing title', function(done) {
      var options = {
        method: 'post',
        url: '/items/create',
        headers: {
          cookie: cookie
        },
        payload: {
          title: '',
          dueDate: '2014-01-01',
          tags: 'ring, epic, blah blah',
          priority: 'high'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('should NOT create the new item - bad date input', function(done) {
      var options = {
        method: 'post',
        url: '/items/create',
        headers: {
          cookie: cookie
        },
        payload: {
          title: 'Ring to morodor',
          dueDate: 'dfhsghfgarbage',
          tags: 'ring, epic, blah blah',
          priority: 'high'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

  });

  describe('post /items/3/completed', function() {
    it('should update the item', function(done) {
      var options = {
        method:'post',
        url:'/items/0000000000000000000000a1/completed',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/items');
        done();
      });
    });

    it('should NOT update the item - bad itemId', function(done) {
      var options = {
        method:'post',
        url:'/items/zx908a/completed',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

  });


});
