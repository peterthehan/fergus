const randomColor = require('randomcolor');

// title, description, color, footer, image, thumbnail, fields
module.exports = {
  process: (embed, color = 0x4F545C) => {
    embed.color = parseInt('0x' + randomColor().substr(1));
    return embed;
  },

  fields: (names, values, inlines) => {
    return values.map((currentValue, index) => {
      return {
        name: names[index],
        value: currentValue,
        inline: inlines[index],
      };
    });
  },
};
