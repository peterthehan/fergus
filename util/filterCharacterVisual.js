const character_visual = require('../Decrypted/get_character_visual.json')['character_visual'].filter(element => element['type'] === 'HERO'); // 662

module.exports = filterCharacterVisual = (grade) => {
  return character_visual
    .filter(element => parseInt(element['id'].match(/_\d/)[0].match(/\d/)[0]) === parseInt(grade));
}
