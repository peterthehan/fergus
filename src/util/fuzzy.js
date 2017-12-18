const leven = require('leven');
const { localize, } = require('./localize.js');

function filterByExactMatch(data, query, key, languageCode) {
  const querySet = [...new Set(query.split(' '))];

  return data.filter(i => {
    const localized = localize(i[key], languageCode);
    if (!localized) {
      return false;
    }

    const dataSet = new Set(localized.toLowerCase().split(' '));
    return new Set(querySet.filter(j => dataSet.has(j))).size;
  });
}

function normalizedLeven(str1, str2) {
  return !str1 && !str2
    ? 0
    : leven(str1, str2) / Math.max(str1.length, str2.length);
}

module.exports = {
  filterByGrade: (data, grade) => {
    let filtered;
    if (!grade) {
      filtered = data.filter(i => !i.promote);
    } else {
      grade = parseInt(grade, 10);
      filtered = data.filter(i => i.grade === grade);
    }

    return filtered;
  },
  fuzzy: (data, query, key, languageCode) => {
    // reduce search space if there are exact matches found
    const filtered = filterByExactMatch(data, query, key, languageCode);
    if (filtered.length !== 0) {
      data = filtered;
    }

    // calculate normalized levenshtein edit distances between data and query
    const distances = data.map(i => {
      const localized = localize(i[key], languageCode);
      return localized === null
        ? 1 // largest distance possible
        : normalizedLeven(query, localized.toLowerCase());
    });

    // get index of the smallest distance (best match) and return obj
    const index = distances.indexOf(Math.min(...distances));
    return data[index];
  },
};
