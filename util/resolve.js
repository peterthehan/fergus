const data = require('../Decrypted/filtered_textlocale_en_us.json');

module.exports = resolve = (value) => {
  //console.log(value);
  return value in data ? data[value] : value;
}