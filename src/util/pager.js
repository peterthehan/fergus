const config = require('../config.json');

module.exports = {
  pager: (message, output, page) => {
    message.channel
      .send({ embed: output[page], })
      .then(async (newMessage) => {
        // no paging required for single pages
        if (output.length <= 1) {
          return;
        }

        // add arrow_backward, arrow_forward reactions
        await newMessage.react('◀');
        await newMessage.react('▶');

        // create reactioncollector
        const collector = newMessage.createReactionCollector(
          (reaction, user) => ['◀', '▶',].includes(reaction.emoji.name) && user.id !== message.client.user.id && user.id === message.author.id,
          { time: parseInt(config.pager_timeout, 10), }
        );

        // collect event handler
        collector.on('collect', (collected) => {
          // remove all non-bot reactions
          collected.users.array().forEach(user => {
            if (user.id !== message.client.user.id) {
              collected.remove(user.id);
            }
          });

          // paging logic
          if (collected._emoji.name === '▶') {
            if (page !== output.length - 1) {
              ++page;
            } else {
              page = 0;
            }
          } else if (collected._emoji.name === '◀') {
            if (page !== 0) {
              --page;
            } else {
              page = output.length - 1;
            }
          }

          // edit view
          newMessage.edit({ embed: output[page], });
        });

        // end event handler
        collector.on('end', () => newMessage.clearReactions());
      })
      .catch(error => console.log(error));
  },
};
