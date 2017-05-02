exports.run = (message, args) => {
  // parallel arrays
  const names = [
    'Tier Lists',
    'Champions',
    'Manacar',
    'Fortress of Souls',
    'Monuments',
    'Comics',
    'Miscellaneous'
  ];
  const values = [
    `[Hero/SBW/Skill IRC Tier List](https://goo.gl/oNQ2iF) by jaetheho, Viress, sakai4eva, kamakiller\n` +
      `[Accurina's Inaccurate Tier List](https://goo.gl/bBgMTg) by Accurina`,
    `[Vyrlokar's Ultimate Guide to the CQ Champions](https://goo.gl/M37qRm) by Vyrlokar`,
    `[Manacar Rage, Ruin, Void, and End](https://goo.gl/PbpKdG) by kamakiller\n` +
      `[Manacar Comic](https://goo.gl/aJ8Yoy)`,
    `[Guide to unlocking "secret" FoS10](https://goo.gl/9BXBkD) by /u/LargeBagel`,
    `[CQ Monuments and How To Get Them](https://goo.gl/UiWxOI) by /u/CalvinCopyright`,
    `[Volume 1](https://goo.gl/JpOluL), ` +
      `[Volume 2](https://goo.gl/VH83O2), ` +
      `[Volume 3](https://goo.gl/OEKdP6), ` +
      `[Volume 4](https://goo.gl/T1d729), ` +
      `[Volume 5](https://goo.gl/EikwMq), ` +
      `[Volume 6](https://goo.gl/rkXgXC), `,
    `[Berry System](https://goo.gl/jbgmLa)\n` +
      `[CQ Hero Illustrations](https://goo.gl/06hnsT) by /u/Cyloz`
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
