const math = require('mathjs');
module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run();
  if (args.length === 1) {
    embed
      .setTitle('Examples')
      .setDescription('http://mathjs.org/')
      .addField(
        'Arithmetic',
        '`pi + 3` → `6.141...`\n' +
        '`2^10 - 1` → `1023`\n' +
        '`5 % 2` → `1`',
        true)
      .addField(
        'Functions',
        '`abs(-cos(0)) + sqrt(-25)` → `1 + 5i`\n' +
        '`det([-1, 2; 3, 1])` → `-7`\n' +
        '`mean(1, 2, 3)` → `2`',
        true)
      .addField(
        'Boolean',
        '`true and false` → `false`\n' +
        '`isPrime(7)` → `true`\n' +
        '`not true → `false`',
        true)
      .addField(
        'Units',
        '`90 km/h to m/s` → `25 m / s`\n' +
        '`9.81 m/s^2 * 1 kg * 5 m` → `49.05 J`\n' +
        '`37 degC to degF` → `98.6 degF`',
        true);
  } else {
    try {
      const expression = args.slice(1).join(' ');
      const output = math.eval(expression);
      embed.setDescription(output);
    } catch (error) {
      embed.setDescription(error);
      console.error(`${error.name}: ${error.message}`);
    }
  }
  message.channel.sendEmbed(embed);
};
