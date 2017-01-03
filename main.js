// Create bot.
const discord = require('discord.js');
const client = new discord.Client();

// Load event handlers.
require('./util/loadEvents.js')(client);

// Refer to config_example.json.
client.login(require('./config.json').token);
