const { sync } = require('glob');
const { config } = require('dotenv');
const server = require('./server/')
const { Client, Routes, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

config();
client.commands = new Map();
client.slashs = new Map();

sync('./commands/message/**/**.cjs').forEach(command_path => {
  var command = require(command_path);
  command.names.forEach(name => {
    client.commands.set(name, command);
  });
});

sync('./commands/slash/**/**.cjs').forEach(command_path => {
  var command = require(command_path);
  command.names.forEach(name => {
    client.slashs.set(name, command);
  });
});

sync('./events/**/**.cjs').forEach(event_path => {
  var event = require(event_path);
  event.run(client);
});


client.login(process.env.DISCORD_TOKEN)