const embed = require('../util/embed.js');

exports.run = (message, args) => {
  let e = embed.process({ description: 'Pinging...', });

  message.channel
    .send({ embed: e, })
    .then(newMessage => {
      const names = ['HTTP ping',];
      const values = [
        `${newMessage.createdTimestamp - message.createdTimestamp} ms`,
      ];
      const inlines = [true,];

      e = embed.process({
        title: 'Pong! 🏓',
        fields: embed.fields(names, values, inlines),
      });

      newMessage.edit({ embed: e, });
    })
    .catch(error => console.log(error));
}
