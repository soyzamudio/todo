'use strict';

module.exports = function paginate(search) {
  var url = '?';
  if (search.sort) { url += 'sort=' + search.sort; }
  if (search.filter) { url += '&filter=' + search.filter + '&value=' + search.value; }
  return url + '&skip=';
};
