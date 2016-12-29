exports.run = function(error, cap, message) {
  const embed = require('./embed.js').run()
    .setDescription(
      require('./capStringLength.js').run(error, cap) + message);
  return embed;
};
