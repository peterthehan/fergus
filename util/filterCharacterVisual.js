const d = require('../data.js');
const character_visual = d.character_visual();

const extractGrade = require('./extractGrade.js');

// grade can be:
// the string 'max',
// an integer bounded by [1, 6], or
// an array of integers with each element bounded by [1, 6] with no duplicates
module.exports = filterCharacterVisual = (grade) => {
  if (grade === 'max') {
    return character_visual.filter(element => element['upgradetargethero'] === null);
  }
  return grade.constructor === Array // filter by a single grade or an array of grades
    ? character_visual.filter(element => grade.includes(extractGrade(element['id'])))
    : character_visual.filter(element => parseInt(grade) === extractGrade(element['id']));
}
