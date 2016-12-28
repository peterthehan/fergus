exports.run = function(message, args) {
  if (message.author.id === '206161807491072000') { // my id
    if (!isNaN(parseInt(args[1])) && parseInt(args[1]) > 1) {
      let messagecount = parseInt(args[1]);
      if (messagecount > 5) {
        messagecount = 5;
      }
      message.channel.fetchMessages({limit: messagecount})
        .then((messages) => message.channel.bulkDelete(messages));
    }
  }
};
