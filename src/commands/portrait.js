const heroes = require('../datas/heroes.json');
const { filterByGrade, fuzzy, } = require('../util/fuzzy.js');
const { getImagePath, getPrefix, } = require('../util/get.js');
const { getValidLanguageCodes, localize, } = require('../util/localize.js');
const { pager, } = require('../util/pager.js');
const { parseLanguageCode, parseQuery, } = require('../util/parse.js');

portraitInstructions = (message) => {
  const prefix = getPrefix(message);
  const e = {
    title: `${prefix}portrait [<name>] [<lang>]`,
    footer: { text: 'Argument order does not matter.', },
    fields: [
      {
        name: '<name>',
        value: `Get hero data.\n*e.g. ${prefix}portrait lee*`,
      },
      {
        name: '<lang>',
        value: `Localize data (${getValidLanguageCodes().join(', ')}). If omitted, defaults to en.\n*e.g. ${prefix}portrait 리 ko*`,
      },
    ],
  };

  message.channel.send({ embed: e, });
}

portraitInfo = (message, args) => {
  // case-insensitive
  args = args.map(i => i.toLowerCase());

  // parse args into command parameters
  const languageCode = parseLanguageCode(args);
  const query = parseQuery(args, [languageCode,]);

  // filter data and fuzzy search
  let data = filterByGrade(Object.values(heroes), null);
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
  graph = Object.values(graph)
    .sort((a, b) => a.grade > b.grade)
    .filter(i => i.portrait_image);

  // format for sending
  const formatted = graph.map((i, index) => {
    const alternateNames = getValidLanguageCodes()
      .filter(j => j !== languageCode)
      .map(j => `${localize(i.name, j)} (${j})`)
      .join(' | ');

    return {
      title: `${localize(i.name, languageCode)} (${i.grade}★)`,
      footer: { text: `Page ${index + 1}/${graph.length}, ${alternateNames}`, },
      image: { url: getImagePath(`portraits/${i.portrait_image}`), },
    };
  });

  // send message with pagers
  pager(message, formatted, graph.findIndex(i => i.id === data.id));
}

exports.run = (message, args) => {
  !args.length ? portraitInstructions(message) : portraitInfo(message, args);
}
