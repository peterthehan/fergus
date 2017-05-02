exports.run = (message, args) => {
  message.channel
    .send('pinging...')
    .then(newMessage => {
      newMessage.edit(
        'pong! ' +
        `ws: ${Math.round(message.client.ping)} ms, ` +
        `http: ${newMessage.createdTimestamp - message.createdTimestamp} ms`
      );
    })
    .catch(error => console.log(error));
  return true;
};
