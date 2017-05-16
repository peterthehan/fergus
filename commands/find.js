const d = require('../data.js');
const berry = d.berry();
const bread = d.bread();
const character_visual = d.character_visual();
const costume = d.costume();
const skill = d.skill();
const weapon = d.weapon();

const countInstances = require('../util/countInstances.js');
const embed = require('../util/embed.js');
const filter = require('../util/filter.js');
const plurality = require('../util/plurality.js');
const removeDuplicates = require('../util/removeDuplicates.js');
const resolve = require('../util/resolve.js');
const truncateString = require('../util/truncateString.js');

options = () => {
  return [
    'berry',
    'bread',
    'hero',
    'skill',
    'skin',
    'weapon',
  ];
}

findInstructions = () => {
  const names = [`<database> <name>`,];
  const values = [
    'List all occurences of <name> in <database>.\nChoose <database> from: ' +
        `${options().join(', ')}.\n` +
        '*e.g. !find bread donut, !find skin halloween*',
  ];
  const inlines = [true,];

  return embed.process({
    title: `!find [<database> <name>]`,
    fields: embed.fields(names, values, inlines),
  });
}

find = (name, data) => {
  // isStrongFilter = false
  const filtered = filter(name, data[0], data[1], false);

  let title;
  let description;
  if (filtered.length === 0) {
    description = '';
    title = 'No results found!';
  } else {
    // remove duplicate results, particularly from skill
    const results = removeDuplicates(
      filtered.map(currentValue => resolve(currentValue[data[1]]))
    );
    description = truncateString(results.join(', '));
    title =
      'Displaying ' +
      `${countInstances(description, ',') + 1} of ${results.length} ` +
      `result${plurality(results.length)} found`;
  }

  return embed.process({ title: title, description: description, });
}

getData = (data) => {
  if (data === 'berry') {
    return [berry, 'name'];
  } else if (data === 'bread') {
    return [bread, 'name'];
  } else if (data === 'hero') {
    return [character_visual, 'name'];
  } else if (data === 'skill') {
    return [skill, 'name'];
  } else if (data === 'skin') {
    return [costume, 'costume_name'];
  } else if (data === 'weapon') {
    return [weapon, 'name'];
  }
  return null;
}

exports.run = (message, args) => {
  let e;
  if (args.length === 0) {
    e = findInstructions();
  } else {
    const arg0 = args.shift();
    const data = getData(arg0);
    e = data !== null
        ? find(args, data)
        : embed.process({
            title: 'Error',
            description:
                `${arg0} is not a valid parameter! ` +
                `Choose from: ${options().join(', ')}.`,
          });
  }

  message.channel.send({ embed: e, });
  return true;
}
