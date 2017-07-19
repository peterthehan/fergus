const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const names = [
    'Tier lists',
    'Champions',
    'LoPF',
    'Manacar',
    'How to get',
    'Miscellaneous',
    `Beginner's guide comics`,
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
    `[Illustrations](https://goo.gl/06hnsT)\n` +
      `[Assets](https://goo.gl/VAXQMg)\n` +
      `[block-map](https://goo.gl/wkYdqt)`,
    `[Vol. 1](https://goo.gl/JpOluL), ` +
      `[2](https://goo.gl/VH83O2), ` +
      `[3](https://goo.gl/OEKdP6), ` +
      `[4](https://goo.gl/T1d729), ` +
      `[5](https://goo.gl/EikwMq), ` +
      `[6](https://goo.gl/rkXgXC), ` +
      `[7](https://goo.gl/fsTsgl), ` +
      `[8](https://goo.gl/1dDcVR), ` +
      `[Berry system](https://goo.gl/jbgmLa)`,
  ];
  const inlines = [true, true, true, true, true, true, false,];

  const e = embed.process({
    title: 'Useful links',
    description: 'Come check out the new [Crusaders Quest Database (cqdb)](https://goo.gl/fdg6M8)!\n\u200b',
    fields: embed.fields(names, values, inlines),
  });

  message.channel.send({ embed: e, });
}
