const removeDuplicates = require('./removeDuplicates.js');
const resolve = require('./resolve.js');

module.exports = filter = (query, data, key, isStrongFilter = true) => {
  // case-insensitive
  query = query.map(currentValue => currentValue.toLowerCase());

  // filter substring match between data and query
  let filtered = query.map(currentValue => {
    return data.filter(element => {
      const resolved = resolve(element[key]);
      if (resolved === null) {
        return false;
      }
      // check equality between each word of query to each word of resolved
      // check if currentValue is a substring of resolved
      return isStrongFilter
        ? resolved.toLowerCase().split(' ').includes(currentValue)
        : resolved.toLowerCase().includes(currentValue);
    });
  });

  // flatten array
  filtered = [].concat.apply([], filtered);
  // remove duplicates
  filtered = removeDuplicates(filtered);

  return filtered;
}
