/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var Item = require('../../server/models/item');
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
require('../../server/index');

describe('Item', function() {
  beforeEach(function(done) {
    Item.remove();
    User.remove(function() {
      var user = new User({email: 'bilbo@theShire.com', password: '123'});
      User.register(user, done);
    });
  });

  describe('Item', function() {
    it('should create am item', function(done) {
      var tags = 'ring, epic, tiring, DoOm and GloOm';
      tags = tags.split(',');
      tags = tags.map(function(e) {
        return _.kebabCase(e.toLowerCase());
      })
      User.findOne({email: 'bilbo@theShire.com'}, function(err, user) {
        var item = new Item({title: 'Get ring to Mount Doom', dueDate: Date.now, tags: tags, priority: 'high', userId: user._id});
        expect(item.title).to.equal('Get ring to Mount Doom');
        expect(item.dueDate).to.be.instanceof(Date);
        expect(item.createdAt).to.be.instanceof(Date);
        expect(item.userId).to.be.ok;
        expect(item).to.be.ok;
        done();
      });
    });
  });
});
