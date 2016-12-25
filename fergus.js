// Refer to config_example.json.
const CONFIG = require('./config.json');

// Get Crusaders Quest database JSON objects.
const BREAD_OBJECT = require('./cqdb/bread.json');
const GODDESS_OBJECT = require('./cqdb/goddesses.json');
const HERO_OBJECT = require('./cqdb/heroes.json');
const SBW_OBJECT = require('./cqdb/sbws.json');
// const SKILL_OBJECT = require('./cqdb/skills.json');
const SKIN_OBJECT = require('./cqdb/skins.json');
const WEAPON_OBJECT = require('./cqdb/weapons.json');

// Get command functions.
const bread = require('./scripts/bread.js');
const goddess = require('./scripts/goddesses.js');
const hero = require('./scripts/heroes.js');
const sbw = require('./scripts/sbws.js');
// const skill = require('./scripts/skills.js');
const skin = require('./scripts/skins.js');
const weapon = require('./scripts/weapons.js');

const etc = require('./scripts/etc.js');

// Create bot.
const discord = require('discord.js');
const client = new discord.Client();

// Asynchronous event handler emits ready when ready to start working.
// Also starts the Playing status of the bot.
client.on('ready', () => {
  etc.log(
    client.user,
    'online (serving ' +
    client.guilds.size + ' server(s), ' +
    client.channels.size + ' channel(s), ' +
    client.users.size + ' user(s))');

  // http://stackoverflow.com/questions/6962658/randomize-setinterval-how-to-rewrite-same-random-after-random-interval
  (function loop() {
    // 1m 30s plus-minus 15s, in ms.
    const min = 75000;
    const max = 105000;
    const random = Math.floor(Math.random() * (max - min)) + min;
    setTimeout(
      () => {
        const str = etc.getGame();
        etc.log(client.user, `Playing ${str} (waited ${random} ms)`);
        client.user.setGame(str);
        loop();
      },
      random);
  }());
});

// Welcome event handler.
client.on('guildMemberAdd', (member) => {
  member.guild.channels.get(member.guild.id).sendMessage(
    CONFIG.welcomePre + member + CONFIG.welcomePost);
  etc.log(member.user, 'joined');
});

// Farewell event handler.
client.on('guildMemberRemove', (member) => {
  member.guild.channels.get(member.guild.id).sendMessage(
    CONFIG.farewellPre + member + CONFIG.farewellPost);
  etc.log(member.user, 'left');
});

// Message event handler.
client.on('message', (message) => {
  const prefix = CONFIG.prefix;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const msg = message.content.toLowerCase(); // case-insensitive

  // Command list.
  if (msg.startsWith(prefix + 'help')) {
    message.channel.sendEmbed(etc.getHelp());
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'about')) {
    message.channel.sendEmbed(etc.getAbout());
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'bread')) {
    message.channel.sendEmbed(bread.getBread(msg.split(' '), BREAD_OBJECT));
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'goddess')) {
    message.channel.sendEmbed(goddess.getGoddess(msg.split(' '), GODDESS_OBJECT));
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'hero')) {
    message.channel.sendEmbed(hero.getHero(msg.split(' '), HERO_OBJECT));
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'sbw')) {
    // message.channel.sendEmbed(sbw.getSbw(msg.split(' '), SBW_OBJECT));
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'skill')) {
    // message.channel.sendEmbed(skill.getSkill(msg.split(' '), SKILL_OBJECT));
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'skin')) {
    message.channel.sendEmbed(skin.getSkin(msg.split(' '), SKIN_OBJECT));
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'weapon')) {
    message.channel.sendEmbed(weapon.getWeapon(msg.split(' '), WEAPON_OBJECT));
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'lenny')) {
    message.channel.sendEmbed(etc.getLenny());
    etc.log(message.author, msg, message.channel.name);
  } else if (msg.startsWith(prefix + 'fergus')) {
    message.channel.sendEmbed(etc.getFergus());
    etc.log(message.author, msg, message.channel.name);
  }
});

// Node's unhandledRejection event handler.
// Do nothing.
// http://eng.wealthfront.com/2016/11/03/handling-unhandledrejections-in-node-and-the-browser/
process.on('unhandledRejection', (err) => {
  console.error(
    'Uncaught Promise Error: \n' + err.stack);
});

client.login(CONFIG.token);
