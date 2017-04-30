const levenshtein = require('fast-levenshtein');
const fi = require('./filter.js');
const re = require('./resolve.js');

exports.fuzzy = (query, data, key) => {
  const filtered = fi.filter(query, data, key);

  // reduce search space if there are exact matches found
  if (filtered.length !== 0) {
    data = filtered;
  }

  // calculate normalized levenshtein distances
  query = query.join(' ').toLowerCase();
  const distances = data.map(currentValue => {
    const resolved = re.resolve(currentValue[key]);
    return resolved === null
      ? 1 // largest distance possible
      : levenshtein.get(query, resolved.toLowerCase()) / Math.max(query.length, resolved.length);
  });

  // get index of the smallest distance (best match) and return obj
  const index = distances.indexOf(Math.min(...distances));
  return data[index];
}
