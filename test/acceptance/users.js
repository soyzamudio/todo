/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];

describe('user route', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd: __dirname + '/../scripts'}, function(err, stdout, stderr) {
      done();
    });
  });

  describe('get /register', function() {
    it('should display the registration page', function(done) {
      var options = {method:'get', url:'/register'};
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.payload).to.include('Register');
        done();
      });
    });
  });

  describe('get /users', function() {
    it('should create a new user', function(done) {
      var options = {
        method:'post',
        url:'/users',
        payload: {
          email: 'legolas@theShire.com',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
        done();
      });
    });
  });

  describe('get /users', function() {
    it('should NOT create a new user - wrong user', function(done) {
      var options = {
        method:'post',
        url:'/users',
        payload: {
          email: 'bilbo@theShire.com',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/register');
        done();
      });
    });
  });

  describe('get /users', function() {
    it('should NOT create a new user - no email', function(done) {
      var options = {
        method:'post',
        url:'/users',
        payload: {
          email: '',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('get /users', function() {
    it('should NOT create a new user - no password', function(done) {
      var options = {
        method:'post',
        url:'/users',
        payload: {
          email: 'legolas@theShire.com',
          password: ''
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('get /login', function() {
    it('should render the login view', function(done) {
      var options = {
        method:'get',
        url:'/login'
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.payload).to.include('Log In');
        done();
      });
    });
  });

  describe('post /users/authenticate', function() {
    it('should authenticate a user', function(done) {
      var options = {
        method:'post',
        url:'/users/authenticate',
        payload: {
          email: 'bilbo@theShire.com',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.headers['set-cookie']).to.be.ok;
        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/');
        done();
      });
    });
  });

  describe('get /users/authenticate', function() {
    it('should NOT login user', function(done) {
      var options = {
        method:'post',
        url:'/users/authenticate',
        payload: {
          email: 'legolas@theShire.com',
          password: 'wrong'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
        done();
      });
    });
  });

  describe('get /users/authenticate', function() {
    it('should NOT login user', function(done) {
      var options = {
        method:'post',
        url:'/users/authenticate',
        payload: {
          email: '',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('get /users/authenticate', function() {
    it('should NOT login user', function(done) {
      var options = {
        method:'post',
        url:'/users/authenticate',
        payload: {
          email: 'bilbo@theShire.com',
          password: ''
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

});
