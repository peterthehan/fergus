exports.run = (message, args) => {
  // parallel arrays
  const names = [
    'Tier Lists',
    'Champions',
    'Manacar',
    'Fortress of Souls',
    'Monuments',
    `Beginner's Guide Comics`,
    'Miscellaneous'
  ];
  const values = [
    `[Accurina's Inaccurate Tier List](https://goo.gl/bBgMTg)\n` +
      `[Hero/SBW/Skill IRC Tier List](https://goo.gl/oNQ2iF)\n` +
      `[INVEN表翻訳](https://goo.gl/k5PlhB)`,
    `[Vyrlokar's Ultimate Guide to the CQ Champions](https://goo.gl/M37qRm)`,
    `[Manacar Comic](https://goo.gl/aJ8Yoy)\n` +
      `[Manacar Rage, Ruin, Void, and End](https://goo.gl/PbpKdG)`,
    `[Guide to unlocking "secret" FoS10](https://goo.gl/9BXBkD)`,
    `[CQ Monuments and How To Get Them](https://goo.gl/UiWxOI)`,
    `[Berry System](https://goo.gl/jbgmLa)\n` +
      `[Volume 1](https://goo.gl/JpOluL), ` +
      `[Volume 2](https://goo.gl/VH83O2), ` +
      `[Volume 3](https://goo.gl/OEKdP6), ` +
      `[Volume 4](https://goo.gl/T1d729), ` +
      `[Volume 5](https://goo.gl/EikwMq), ` +
      `[Volume 6](https://goo.gl/rkXgXC), ` +
      `[Volume 7](https://goo.gl/fsTsgl)`,
    `[CQ Hero Illustrations](https://goo.gl/06hnsT)`
  ];

  const embed = {
    title: 'Useful Links',
    fields: values.map((currentValue, index) => {
      return { name: names[index], value: currentValue };
    })
  };
  message.channel.send({ embed: embed });
  return true;
};
