const skins = require('../datas/skins.json');
const { fuzzy, } = require('../util/fuzzy.js');
const { getImagePath, getPrefix, } = require('../util/get.js');
const { getValidLanguageCodes, localize, } = require('../util/localize.js');
const { pager, } = require('../util/pager.js');
const { parseLanguageCode, parseQuery, } = require('../util/parse.js');

skinInstructions = (message) => {
  const prefix = getPrefix(message);
  const e = {
    title: `${prefix}skin [<name>] [<lang>]`,
    footer: { text: 'Argument order does not matter.', },
    fields: [
      {
        name: '<name>',
        value: `Get skin data.\n*e.g. ${prefix}skin lee*`,
      },
      {
        name: '<lang>',
        value: `Localize data (${getValidLanguageCodes().join(', ')}). If omitted, defaults to en.\n*e.g. ${prefix}skin 리 ko*`,
      },
    ],
  };

  message.channel.send({ embed: e, });
}

skinInfo = (message, args) => {
  // case-insensitive
  args = args.map(i => i.toLowerCase());

  // parse args into command parameters
  const languageCode = parseLanguageCode(args);
  const query = parseQuery(args, [languageCode,]);

  // filter data and fuzzy search
  let data = Object.values(skins);
  data = fuzzy(data, query, 'name', languageCode);

  const graph = Object.values(skins).filter(i => {
    const dataSet = new Set(i.can_wear);
    return new Set(data.can_wear.filter(j => dataSet.has(j))).size;
  });

  // format for sending
  const formatted = graph.map((i, index) => {
    const alternateNames = getValidLanguageCodes()
      .filter(j => j !== languageCode)
      .map(j => `${localize(i.name, j)} (${j})`)
      .join(' | ');
    const description = i.stats
      .map(j => `${localize(j.stat, languageCode)}: ${j.value}`)
      .join('\n');

    return {
      title: localize(i.name, languageCode),
      description: description,
      footer: { text: `Page ${index + 1}/${graph.length}, ${alternateNames}`, },
      thumbnail: { url: getImagePath(`skins/${i.image}`), },
      fields: [
        {
          name: localize('TEXT_BUTTON_SELL', languageCode),
          value: i.sell_price,
        },
      ],
    };
  });

  // send message with pagers
  pager(message, formatted, graph.findIndex(i => i.image === data.image));
}

exports.run = (message, args) => {
  !args.length ? skinInstructions(message) : skinInfo(message, args);
}
