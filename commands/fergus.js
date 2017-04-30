exports.run = (message, args) => {
  const content = '';
  const file = {
    file: 'https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png'
  };

  message.channel.sendMessage(content, file);
};
