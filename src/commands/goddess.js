const goddesses = require('../datas/goddesses.json');
const { fuzzy, } = require('../util/fuzzy.js');
const { getImagePath, getPrefix, } = require('../util/get.js');
const { getValidLanguageCodes, localize, } = require('../util/localize.js');
const { parseLanguageCode, parseQuery, } = require('../util/parse.js');

goddessInstructions = (message) => {
  const prefix = getPrefix(message);
  return {
    title: `${prefix}goddess [<name>] [<lang>]`,
    footer: { text: 'Argument order does not matter.', },
    fields: [
      {
        name: '<name>',
        value: `Get goddess data.\n*e.g. ${prefix}goddess sera*`,
      },
      {
        name: '<lang>',
        value: `Localize data (${getValidLanguageCodes().join(', ')}). If omitted, defaults to en.\n*e.g. ${prefix}goddess 세라 ko*`,
      },
    ],
  };
}

goddessInfo = (message, args) => {
  // case-insensitive
  args = args.map(i => i.toLowerCase());

  // parse args into command parameters
  const languageCode = parseLanguageCode(args);
  const query = parseQuery(args, [languageCode,]);

  // filter data and fuzzy search
  const data = fuzzy(Object.values(goddesses), query, 'name', languageCode);

  // format for sending
  const alternateNames = getValidLanguageCodes()
    .filter(i => i !== languageCode)
    .map(i => `${localize(data.name, i)} (${i})`)
    .join(' | ');
  return {
    title: localize(data.name, languageCode),
    footer: { text: alternateNames, },
    thumbnail: { url: getImagePath(`goddesses/${data.image}`), },
    fields: [
      {
        name: localize(data.skill_name, languageCode),
        value: localize(data.skill_description, languageCode),
      },
    ],
  };
}

exports.run = (message, args) => {
  const e = !args.length ? goddessInstructions(message) : goddessInfo(message, args);

  message.channel.send({ embed: e, });
}
