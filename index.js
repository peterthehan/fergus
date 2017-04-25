// create bot
const Discord = require('discord.js');
const client = new Discord.Client();

// load event handlers
require('./util/loadEvents.js')(client);

// refer to config_example.json for setup
client.login(require('./config.json').token);
