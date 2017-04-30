const re = require('./resolve.js');

exports.filter = (query, data, key) => {
  // filter any match between data and query
  let filtered = query.map(currentValue => {
    return data.filter(element => {
      const resolved = re.resolve(element[key]);
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
