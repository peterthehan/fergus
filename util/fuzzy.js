const levenshtein = require('fast-levenshtein');

const resolve = require('./resolve.js');

exports.fuzzy = (args, data, key) => {
  // case-insensitive
  const q = args.join(' ').toLowerCase();

  // calculate normalized levenshtein distances
  const distances = data.map(currentValue => {
    const currentArgs= resolve.resolve(currentValue, key).toLowerCase();
    return levenshtein.get(q, currentArgs) / Math.max(q.length, currentArgs.length);
  });

  // get index of the smallest distance
  const index = distances.indexOf(Math.min(...distances));
  return data[index];
}
