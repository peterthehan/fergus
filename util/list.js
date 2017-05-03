const resolve = require('../util/resolve.js');

module.exports = list = (data, key) => {
  return data.length === 0 ? '-' : data.map(currentValue => resolve(currentValue[key])).join(', ');
}
