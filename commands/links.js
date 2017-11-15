const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const names = [
    'Tier lists',
    'Champions',
    'LoPF',
    'Manacar',
    'How to get',
    'Miscellaneous',
    `Hasla Guides`,
  ];
  const values = [
    `[Accurina's](https://goo.gl/bBgMTg)\n` +
      `[IRC's](https://goo.gl/oNQ2iF)\n` +
      `[TISTORY](https://goo.gl/nOC3NK)\n` +
      `[INVEN](https://goo.gl/k5PlhB)`,
    `[Vyrlokar's](https://goo.gl/M37qRm)`,
    `[Nyaa's](https://goo.gl/iqppI0)\n` +
      `[Shintouyu's](https://goo.gl/4i8nCb)\n` +
      `[LoPF map](https://goo.gl/YtlDQH)`,
    `[kamakiller's](https://goo.gl/PbpKdG)\n` +
      `[Comic](https://goo.gl/aJ8Yoy)`,
    `[Monuments](https://goo.gl/e10jeA)\n` +
      `[Get Lionel's skin](https://goo.gl/9BXBkD)\n` +
      `[Get Himiko's skin](https://goo.gl/5yDbjr)`,
    `[Corrected descs](https://goo.gl/Bz1DWB)\n` +
      `[cq-assets](https://goo.gl/UzKBsq)\n` +
      `[block-map](https://goo.gl/wkYdqt)`,
    `[Comics](https://goo.gl/HPsANc), ` +
      `[Season 2](https://goo.gl/UQdjhw), ` +
      `[Berry system](https://goo.gl/jbgmLa)`,
  ];
  const inlines = [true, true, true, true, true, true, false,];

  const e = embed.process({
    title: 'Useful links',
    description: 'Visit the [Crusaders Quest Database (cqdb)](https://goo.gl/fdg6M8)!\n\u200b',
    fields: embed.fields(names, values, inlines),
  });

  message.channel.send({ embed: e, });
}
