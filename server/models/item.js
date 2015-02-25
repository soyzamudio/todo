'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  title: {type: String, required: true},
  dueDate: {type: Date, default: Date.now, required: true},
  createdAt: {type: Date, default: Date.now, required: true},
  priority: {type: String, default: 'low'},
  tags: [{type: String}],
  userId: {type: mongoose.Schema.ObjectId, ref: 'User'},
  isCompleted: {type: Boolean, default: false}
});

module.exports = mongoose.model('Item', itemSchema);
