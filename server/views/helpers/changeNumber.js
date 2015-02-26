'use strict';

module.exports = function changeNumber(skip, number) {
  var sum = parseInt(skip) + parseInt(number);
  if (sum < 0) { sum = 0; }
  return sum;
};
