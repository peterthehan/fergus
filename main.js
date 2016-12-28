// Create bot.
const discord = require('discord.js');
const client = new discord.Client();

// Refer to config_example.json.
const config = require('./config.json');

// Run event handlers.
require('./util/eventLoader.js')(client);

client.login(config.token);
