// Create bot.
const discord = require('discord.js');
const client = new discord.Client();

// Run event handlers.
require('./util/eventLoader.js')(client);

// Refer to config_example.json.
client.login(require('./config.json').token);
