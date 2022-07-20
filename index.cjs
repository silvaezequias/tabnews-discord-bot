const Discord = require('discord.js');
const Express = require('express');
const Dotenv = require('dotenv');
const Glob = require('glob');
const Http = require('http');

const express_app = Express();
const http_server = Http.createServer(express_app);
const client = new Discord.Client({
  intents: 32767
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

express_app.get('/*', (req, res) => {
  res.json({ 
    status: 200,
    message: 'OK'
  });
});

http_server.listen(process.env.PORT, () => {
  console.log(`[HTTP] Servidor conectado na porta ${process.env.PORT}`);
});