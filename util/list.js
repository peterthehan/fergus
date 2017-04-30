const re = require('../util/resolve.js');

exports.list = (data, key) => {
  return data.map(currentValue => re.resolve(currentValue[key])).join(', ');
}
