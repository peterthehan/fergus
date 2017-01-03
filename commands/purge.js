module.exports.run = (message, args) => {
  if (message.author.id === '206161807491072000') { // limit to me
    let messageCount = 2; // by default, delete one message above
    if (!isNaN(parseInt(args[1])) && parseInt(args[1]) >= messageCount) {
      messageCount = parseInt(args[1]) + 1;
      if (messageCount > 7) {
        messageCount = 7;
      }
    }
    message.channel.fetchMessages({limit: messageCount})
      .then((messages) => message.channel.bulkDelete(messages));
  } else {
    console.error('access denied');
  }
};
