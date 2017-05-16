// title, description, color, footer, image, thumbnail, fields
module.exports = {
  process: (embed, color = 0xFF00FF) => {
    embed.color = color;
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
