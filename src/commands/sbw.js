const heroes = require('../datas/heroes.json');
const sbws = require('../datas/sbws.json');
const { filterByGrade, fuzzy, } = require('../util/fuzzy.js');
const { getImagePath, getPrefix, } = require('../util/get.js');
const { getValidLanguageCodes, localize, } = require('../util/localize.js');
const { pager, } = require('../util/pager.js');
const { parseGrade, parseLanguageCode, parseQuery, } = require('../util/parse.js');

sbwInstructions = (message) => {
  const prefix = getPrefix(message);
  const e = {
    title: `${prefix}sbw [<name>] [<star>] [<lang>]`,
    footer: { text: 'Argument order does not matter.', },
    fields: [
      {
        name: '<name>',
        value: `Get sbw data.\n*e.g. ${prefix}sbw lee*`,
      },
      {
        name: '<star>',
        value: `Filter heroes by <star>. If omitted, defaults to highest form.\n*e.g. ${prefix}sbw lee 4*`,
      },
      {
        name: '<lang>',
        value: `Localize data (${getValidLanguageCodes().join(', ')}). If omitted, defaults to en.\n*e.g. ${prefix}sbw 리 ko*`,
      },
    ],
  };

  message.channel.send({ embed: e, });
}

sbwInfo = (message, args) => {
  // case-insensitive
  args = args.map(i => i.toLowerCase());

  // parse args into command parameters
  const grade = parseGrade(args);
  const languageCode = parseLanguageCode(args);
  const query = parseQuery(args, [grade, languageCode,]);

  // filter data and fuzzy search
  let data = filterByGrade(Object.values(heroes), grade)
    .filter(i => [4, 5, 6,].includes(i.grade));
  data = fuzzy(data, query, 'name', languageCode);

  // handle case for heroes without sbws
  if (!data.has_sbw) {
    const e = {
      description: `${localize(data.name, languageCode)} does not have an sbw yet!`,
    };

    message.channel.send({ embed: e, });
    return;
  }

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
  graph = Object.values(graph)
    .filter(i => i.has_sbw)
    .sort((a, b) => a.grade > b.grade);

  // format for sending
  const sbwGraph = graph.map(i => sbws[i.id]);
  const formatted = sbwGraph.map((i, index) => {
    const alternateNames = getValidLanguageCodes()
      .filter(j => j !== languageCode)
      .map(j => `${localize(graph[index].name, j)} (${j})`)
      .join(' | ');

    const e = {
      title: `${localize(graph[index].name, languageCode)} (${graph[index].grade}★)`,
      footer: { text: `Page ${index + 1}/${graph.length}, ${alternateNames}`, },
      thumbnail: { url: getImagePath(`sbws/${i.image}`), },
      fields: [
        {
          name: localize('TEXT_CHA_CLASS', languageCode),
          value: localize(i.class, languageCode),
          inline: true,
        },
        {
          name: localize('TEXT_PRACTICE_OPTION_ATTACK_RANGE', languageCode),
          value: i.range.toString(),
          inline: true,
        },
        {
          name: localize('TEXT_CHA_ATK', languageCode),
          value: i.atk_power.toString(),
          inline: true,
        },
        {
          name: localize('TEXT_CHA_ATTSPD', languageCode),
          value: i.atk_speed.toString(),
          inline: true,
        },
      ],
    };

    const name = localize(i.name, languageCode);
    const description = localize(i.description, languageCode);

    if (name && description) {
      // chunk sbw description into strings of length 1024
      const chunks = description
        .replace(/@|#|\$/g, '')
        .match(/(.|[\r\n]){1,1024}/g)
        .reverse()
        .forEach((j, index) => {
          const field = {
            name: !index ? `${name}` : '\u200b',
            value: j,
          };

          e.fields.unshift(field);
        });
    }

    return e;
  });

  // send message with pagers
  pager(message, formatted, graph.findIndex(i => i.id === data.id));
}

exports.run = (message, args) => {
  !args.length ? sbwInstructions(message) : sbwInfo(message, args);
}
