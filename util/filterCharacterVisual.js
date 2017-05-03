const d = require('../data.js');
const character_visual = d.character_visual();

const extractGrade = require('./extractGrade.js');

module.exports = filterCharacterVisual = (grade) => {
  return grade.constructor === Array // filter by a single grade or an array of grades
    ? character_visual.filter(element => grade.includes(extractGrade(element['id'])))
    : character_visual.filter(element => parseInt(grade) === extractGrade(element['id']));
}
