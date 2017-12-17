const heroes = require('../datas/heroes.json');
const { filterByGrade, fuzzy, } = require('../util/fuzzy.js');
const { getImagePath, getPrefix, } = require('../util/get.js');
const { getValidLanguageCodes, localize, } = require('../util/localize.js');
const { pager, } = require('../util/pager.js');
const { parseGrade, parseLanguageCode, parseQuery, } = require('../util/parse.js');

heroInstructions = (message) => {
  const prefix = getPrefix(message);
  const e = {
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

  message.channel.send({ embed: e, });
}

heroInfo = (message, args) => {
  // case-insensitive
  args = args.map(i => i.toLowerCase());

  // parse args into command parameters
  const grade = parseGrade(args);
  const languageCode = parseLanguageCode(args);
  const query = parseQuery(args, [grade, languageCode,]);

  // filter data and fuzzy search
  let data = filterByGrade(Object.values(heroes), grade);
  data = fuzzy(data, query, 'name', languageCode);

  // create hero's promotion graph
  let graph = {};
  const stack = [data];
  while (stack.length) {
    const item = stack.pop();
    graph[item.id] = item;

    if (item.demote && !graph[item.demote]) {
      stack.push(heroes[item.demote]);
    }

    if (item.promote && !graph[item.promote]) {
      stack.push(heroes[item.promote]);
    }
  }
  graph = Object.values(graph).sort((a, b) => a.grade > b.grade);

  // format for sending
  const rarity = {
    en: 'Rarity',
    ja: 'カテゴリー',
    ko: '분류',
    zh: '分类',
  };
  const gender = {
    en: 'Gender',
    ja: '性別',
    ko: '성별',
    zh: '性别',
  };
  const formatted = graph.map((i, index) => {
    const alternateNames = getValidLanguageCodes()
      .filter(j => j !== languageCode)
      .map(j => `${localize(i.name, j)} (${j})`)
      .join(' | ');

    return {
      title: `${localize(i.name, languageCode)} (${i.grade}★)`,
      description: localize(i.description, languageCode),
      footer: { text: `Page ${index + 1}/${graph.length}, ${alternateNames}`, },
      thumbnail: { url: getImagePath(`heroes/${i.image}`), },
      fields: [
        {
          name: localize('TEXT_CHA_CLASS', languageCode),
          value: localize(i.class, languageCode),
          inline: true,
        },
        {
          name: rarity[languageCode],
          value: localize(i.rarity, languageCode),
          inline: true,
        },
        {
          name: localize('TEXT_CHAMPION_SUPPLY_HERO_DOMAIN', languageCode),
          value: i.domain ? localize(i.domain, languageCode) : '-',
          inline: true,
        },
        {
          name: gender[languageCode],
          value: localize(i.gender, languageCode),
          inline: true,
        },
      ],
    };
  });

  // send message with pagers
  pager(message, formatted, graph.findIndex(i => i.id === data.id));
}

exports.run = (message, args) => {
  !args.length ? heroInstructions(message) : heroInfo(message, args);
}
