const berries = require('../datas/berries.json');
const { filterByGrade, fuzzy, } = require('../util/fuzzy.js');
const { getImagePath, getPrefix, } = require('../util/get.js');
const { getValidLanguageCodes, localize, } = require('../util/localize.js');
const { parseGrade, parseLanguageCode, parseQuery, } = require('../util/parse.js');

berryInstructions = (message) => {
  const prefix = getPrefix(message);
  return {
    title: `${prefix}berry [<name>] [<star>] [<lang>]`,
    footer: { text: 'Argument order does not matter.', },
    fields: [
      {
        name: '<name>',
        value: `Get berry data.\n*e.g. ${prefix}berry almighty berry*`,
      },
      {
        name: '<star>',
        value: `Filter berries by <star>.\n*e.g. ${prefix}berry almighty berry 4*`,
      },
      {
        name: '<lang>',
        value: `Localize data (${getValidLanguageCodes().join(', ')}). If omitted, defaults to en.\n*e.g. ${prefix}berry 만능의 열매 ko*`,
      },
    ],
  };
}

berryInfo = (message, args) => {
  // case-insensitive
  args = args.map(i => i.toLowerCase());

  // parse args into command parameters
  const grade = parseGrade(args);
  const languageCode = parseLanguageCode(args);
  const query = parseQuery(args, [grade, languageCode,]);

  // filter data and fuzzy search
  let i = Object.values(berries);
  if (grade) {
    i = filterByGrade(i, grade);

  }
  i = fuzzy(i, query, 'name', languageCode);

  // format for sending
  const alternateNames = getValidLanguageCodes()
    .filter(j => j !== languageCode)
    .map(j => `${localize(i.name, j)} (${j})`)
    .join(' | ');
  const value = i.value <= 1 ? `${parseInt(i.value * 100, 10)}%` : i.value;

  return {
    title: `${localize(i.name, languageCode)} (${i.grade}★) (${localize(i.rarity, languageCode)})`,
    thumbnail: { url: getImagePath(`berries/${i.image}`), },
    fields: [
      {
        name: `${localize('TEXT_POINT_SHORT', languageCode)}`,
        value: value,
        inline: true,
      },
      {
        name: localize('TEXT_BREAD_CRIT_RATE', languageCode),
        value: `${i.great * 100}%`,
        inline: true,
      },
      {
        name: localize('TEXT_BUTTON_SELL', languageCode),
        value: i.sell_price,
        inline: true,
      },
      {
        name: 'Eat price',
        value: i.eat_price,
        inline: true,
      },
    ],
    footer: { text: alternateNames, },
  };
}

exports.run = (message, args) => {
  const e = !args.length ? berryInstructions(message) : berryInfo(message, args);

  message.channel.send({ embed: e, });
}
