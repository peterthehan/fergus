const moment = require('moment');
const beautify = require('js-beautify').js_beautify;
module.exports.run = (message, args) => {
  if (message.author.id === '206161807491072000') { // limit to me
    const code = beautify(args.slice(1).join(' '), {indent_size: 2});

    let embed = require('../util/embed.js').run()
    if (!code.includes('token')) {
      embed
        .addField('Input', '```js\n' + code + '```')
        .setFooter(
          moment(message.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss'));
      try {
        embed.addField(
          'Output',
          '```js\n' + eval(code) + '```');
      } catch (error) {
        embed.addField(
          'Output',
          '```js' + `${error.name}: ${error.message}` + '```');
      }
    } else {
      embed.setDescription('This is a bad idea.');
    }
    message.channel.sendEmbed(embed);
  } else {
    console.error('access denied');
  }
};
