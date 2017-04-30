const resolve = require('../util/resolve.js');

exports.list = (data, key) => {
  return data.map(currentValue => resolve.resolve(currentValue, key)).join(', ');
}
