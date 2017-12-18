const heroes = require('../datas/heroes.json');
const { fuzzy, } = require('../util/fuzzy.js');
const { getImagePath, getPrefix, } = require('../util/get.js');
const { getValidLanguageCodes, localize, } = require('../util/localize.js');
const { parseLanguageCode, parseQuery, } = require('../util/parse.js');

factionInstructions = (message) => {
  const prefix = getPrefix(message);
  return {
    title: `${prefix}hero [<name>] [<star>] [<lang>]`,
    footer: { text: 'Argument order does not matter.', },
    fields: [
      {
        name: '<name>',
        value: `Get hero data.\n*e.g. ${prefix}hero lee*`,
      },
      {
        name: '<star>',
        value: `Filter heroes by <star>. If omitted, defaults to highest form.\n*e.g. ${prefix}hero lee 4*`,
      },
      {
        name: '<lang>',
        value: `Localize data (${getValidLanguageCodes().join(', ')}). If omitted, defaults to en.\n*e.g. ${prefix}hero 리 ko*`,
      },
    ],
  };
}

factionInfo = (message, args) => {
  // case-insensitive
  args = args.map(i => i.toLowerCase());

  // parse args into command parameters
  const languageCode = parseLanguageCode(args);
  const query = parseQuery(args, [languageCode,]);

  // filter data and fuzzy search
  const factions = new Set();
  Object.values(heroes).forEach(i => factions.add(i.domain));
  let data = [...factions].map(i => {
    return { domain: i, };
  });
  data = fuzzy(data, query, 'domain', languageCode);

  const i = Object.values(heroes)
    .filter(i => data.domain === i.domain)
    .map(i => localize(i.name, languageCode))
    .join(', ');

  // format for sending
  const alternateNames = getValidLanguageCodes()
    .filter(j => j !== languageCode)
    .map(j => `${localize(data.domain, j)} (${j})`)
    .join(' | ');

  return {
    title: localize(data.domain, languageCode),
    description: i,
    footer: { text: alternateNames, },
    thumbnail: { url: getImagePath(`factions/${i.image}`), },
  };
}

exports.run = (message, args) => {
  const e = !args.length ? factionInstructions(message) : factionInfo(message, args);

  message.channel.send({ embed: e, });
}
