const embed = require('../util/embed.js');

exports.run = (message, args) => {
  let e = embed.process({ description: 'Pinging...'});

  message.channel
      .send({ embed: e, })
      .then(newMessage => {
        const names = ['Websocket ping', 'HTTP ping',];
        const values = [
          `${Math.round(message.client.ping)} ms`,
          `${newMessage.createdTimestamp - message.createdTimestamp} ms`,
        ];
        const inlines = [true, true,];

        e = embed.process({
          title: 'Pong!',
          fields: embed.fields(names, values, inlines),
        });

        newMessage.edit({ embed: e, });
      })
      .catch(error => console.log(error));
  return true;
}
