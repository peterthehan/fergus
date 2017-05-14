exports.run = (message, args) => {
  let embed = { description: 'Pinging...'};

  message.channel
    .send({ embed: embed })
    .then(newMessage => {
      embed = {
        title: 'Pong!',
        fields: [
          {
            name: 'Websocket ping',
            value: `${Math.round(message.client.ping)} ms`,
            inline: true
          },
          {
            name: 'HTTP ping',
            value: `${newMessage.createdTimestamp - message.createdTimestamp} ms`,
            inline: true
          }
        ]
      };
      newMessage.edit({ embed: embed });
    })
    .catch(error => console.log(error));
  return true;
};
