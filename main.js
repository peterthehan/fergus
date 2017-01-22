// Create bot.
const Discord = require('discord.js');
const client = new Discord.Client();

// Load event handlers.
require('./util/loadEvents.js')(client);

// Refer to config_example.json.
client.login(require('./config.json').token);
