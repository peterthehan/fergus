// create bot
const Discord = require('discord.js');
const client = new Discord.Client();

// load event handlers
require('./util/loadEvents.js')(client);

client.login(require('./config.json').token);
