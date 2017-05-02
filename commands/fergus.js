exports.run = (message, args) => {
  const embed = { image: { url: 'https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png' } };
  message.channel.send({ embed: embed });
  return true;
};
