const resolve = require('./resolve.js');

module.exports = filter = (query, data, key) => {
  // case-insensitive
  query = query.map(currentValue => currentValue.toLowerCase());

  // filter any match between data and query
  let filtered = query.map(currentValue => {
    return data.filter(element => {
      const resolved = resolve(element[key]);
      return resolved === null
        ? false
        : resolved.toLowerCase().includes(currentValue);
    });
  });

  // flatten array
  filtered = [].concat.apply([], filtered);
  // remove duplicates
  filtered = [...new Set(filtered)];

  return filtered;
}
