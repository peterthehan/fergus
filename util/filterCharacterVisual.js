const character_visual = require('../Decrypted/get_character_visual.json')['character_visual'].filter(element => element['type'] === 'HERO'); // 662

const extractGrade = require('./extractGrade.js');

module.exports = filterCharacterVisual = (grade) => {
  return grade.constructor === Array // filter by a single grade or an array of grades
    ? character_visual.filter(element => grade.includes(extractGrade(element['id'])))
    : character_visual.filter(element => parseInt(grade) === extractGrade(element['id']));
}
