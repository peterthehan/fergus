module.exports = {
  log: (message) => {
    console.log(`${message.guild.name}#${message.channel.name}|${message.author.tag}: ${message.content}`);
  },
};
