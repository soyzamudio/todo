'use strict';

module.exports = function sort(search) {
  var url = '?skip=0';
  if (search.filter) { url += '&filter=' + search.filter + '&value=' + search.value; }
  return url + '&sort=';
};
