const d = require('../data.js');
const berry = d.berry();
const bread = d.bread();
const character_visual = d.character_visual();
const costume = d.costume();
const skill = d.skill();
const weapon = d.weapon();

const countInstances = require('../util/countInstances.js');
const filter = require('../util/filter.js');
const plurality = require('../util/plurality.js');
const removeDuplicates = require('../util/removeDuplicates.js');
const resolve = require('../util/resolve.js');
const truncateString = require('../util/truncateString.js');

const options = '[berry|bread|hero|skill|skin|weapon]';

findInstructions = () => {
  return {
    title: `!find ${options} [<name>]`,
    fields: [
      {
        name: `${options} <name>`,
        value: `List all occurences of <name>.\n*e.g. !find bread donut, !find skin halloween*`,
        inline: true
      }
    ]
  };
}

find = (name, data) => {
  const filtered = filter(name, data[0], data[1], false); // isStrongFilter = false

  let title;
  let description;
  if (filtered.length === 0) {
    description = '';
    title = 'No results found!';
  } else {
    // remove duplicate results, particularly from skill
    const results = removeDuplicates(filtered.map(currentValue => resolve(currentValue[data[1]])));
    description = truncateString(results.join(', '));
    title = `Displaying ${countInstances(description, ',') + 1} of ${results.length} result${plurality(results.length)} found`;
  }

  return {
    title: title,
    description: description
  };
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
  let embed = {};

  if (args.length === 0) {
    embed = findInstructions();
  } else {
    const arg0 = args.shift();
    const data = getData(arg0);
    embed = data !== null
      ? find(args, data)
      : { title: 'Error', description: `${arg0} is not a valid parameter! Choose from ${options}.` };
  }

  message.channel.send({ embed: embed });
  return true;
}
