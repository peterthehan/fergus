const blocks = require('../datas/blocks.json');
const heroes = require('../datas/heroes.json');
const { filterByGrade, fuzzy, } = require('../util/fuzzy.js');
const { getImagePath, getPrefix, } = require('../util/get.js');
const { getValidLanguageCodes, localize, } = require('../util/localize.js');
const { pager, } = require('../util/pager.js');
const { parseGrade, parseLanguageCode, parseQuery, } = require('../util/parse.js');

blockInstructions = (message) => {
  const prefix = getPrefix(message);
  const e = {
    title: `${prefix}block [<name>] [<star>] [<lang>]`,
    footer: { text: 'Argument order does not matter.', },
    fields: [
      {
        name: '<name>',
        value: `Get block data.\n*e.g. ${prefix}block lee*`,
      },
      {
        name: '<star>',
        value: `Filter heroes by <star>. If omitted, defaults to highest form.\n*e.g. ${prefix}block lee 4*`,
      },
      {
        name: '<lang>',
        value: `Localize data (${getValidLanguageCodes().join(', ')}). If omitted, defaults to en.\n*e.g. ${prefix}block 리 ko*`,
      },
    ],
  };

  message.channel.send({ embed: e, });
}

blockInfo = (message, args) => {
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
  const blockGraph = graph.map(i => blocks[i.id]);
  const formatted = blockGraph.map((i, index) => {
    const alternateNames = getValidLanguageCodes()
      .filter(j => j !== languageCode)
      .map(j => `${localize(graph[index].name, j)} (${j})`)
      .join(' | ');

    const e = {
      title: `${localize(graph[index].name, languageCode)} (${graph[index].grade}★)`,
      footer: { text: `Page ${index + 1}/${graph.length}, ${alternateNames}`, },
      thumbnail: { url: getImagePath(`blocks/${i.image}`), },
      fields: [
        {
          name: `${localize(i.block_name, languageCode)} (Lv. ${[1, 1, 1, 2, 2, 3,][graph[index].grade - 1]})`,
          value: localize(i.block_description, languageCode).replace(/@|#|\$/g, ''),
        },
      ],
    };

    const passiveName = localize(i.passive_name, languageCode);
    const passiveDescription = localize(i.passive_description, languageCode);

    if (passiveName && passiveDescription) {
      // chunk passive description into strings of length 1024
      passiveDescription
        .replace(/@|#|\$/g, '')
        .match(/(.|[\r\n]){1,1024}/g)
        .forEach((j, index) => {
          const field = {
            name: !index ? `${passiveName} - ${localize(i.hero_type, languageCode)}` : '\u200b',
            value: j,
          };

          e.fields.push(field);
        });
    }

    return e;
  });

  // send message with pagers
  pager(message, formatted, graph.findIndex(i => i.id === data.id));
}

exports.run = (message, args) => {
  !args.length ? blockInstructions(message) : blockInfo(message, args);
}
