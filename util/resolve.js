const data = [
  Object.assign(...require('../cqdb/get_textlocale_en_us_0.json')['textlocale']),
  Object.assign(...require('../cqdb/get_textlocale_en_us_1.json')['textlocale']),
  Object.assign(...require('../cqdb/get_textlocale_en_us_2.json')['textlocale']),
  Object.assign(...require('../cqdb/get_textlocale_en_us_3.json')['textlocale']),
  Object.assign(...require('../cqdb/get_textlocale_en_us_4.json')['textlocale'])
];

exports.resolve = (obj, key) => {
  const i = obj[key];
  for (d of data) {
    if (obj[key] in d) {
      return d[obj[key]];
    }
  }
  return null; // should never reach here
}
