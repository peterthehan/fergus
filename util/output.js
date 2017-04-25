module.exports.run = message => {
  console.log(
    `${message.author.username}#${message.author.discriminator}: ` +
    `(${message.guild.name}/#${message.channel.name}) ${message.content}`
  );
}
