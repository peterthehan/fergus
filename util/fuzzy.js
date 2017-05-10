const filter = require('./filter.js');
const normalizedLevenshtein = require('./normalizedLevenshtein.js');
const resolve = require('./resolve.js');

module.exports = fuzzy = (query, data, key) => {
  const filtered = filter(query, data, key);

  // reduce search space if there are exact matches found
  if (filtered.length !== 0) {
    data = filtered;
  }

  // calculate normalized levenshtein distances
  query = query.join(' ').toLowerCase();
  const distances = data.map(currentValue => {
    const resolved = resolve(currentValue[key]);
    return resolved === null
      ? 1 // largest distance possible
      : normalizedLevenshtein(query, resolved.toLowerCase());
  });

  // get index of the smallest distance (best match) and return obj
  const index = distances.indexOf(Math.min(...distances));
  return data[index];
}
