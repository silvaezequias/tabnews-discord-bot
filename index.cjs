const Discord = require('discord.js');
const Dotenv = require('dotenv');
const Glob = require('glob');

const client = new Discord.Client({
  intents: 32767,
  partials: ['MESSAGE', 'REACTION'],
});

Dotenv.config();
client.commands = new Map();

Glob.sync('./commands/**.cjs').forEach(command_path => {
  var command = require(command_path);
  command.names.forEach(name => {
    client.commands.set(name, command);
  });
});

Glob.sync('./events/**.cjs').forEach(event_path => {
  var event = require(event_path);
  event.run(client);
});

client.login(process.env.DISCORD_TOKEN).then(() => {
  console.log('[DISCORD] Client conectado')
});