const levenshtein = require('fast-levenshtein');

module.exports = normalizedLevenshtein = (str1, str2) => {
  return levenshtein.get(str1, str2) / Math.max(str1.length, str2.length);
}
