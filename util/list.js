const resolve = require('../util/resolve.js');

exports.list = (arr, key) => {
  return arr.map(currentValue => resolve.resolve(currentValue, key)).join(', ');
}
