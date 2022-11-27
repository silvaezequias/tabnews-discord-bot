const { MessageEmbed } = require('discord.js');

async function ping(client, message) {
  var messageTimestamp = Date.now();
 var m = await message.reply({ content: 'Pinging the Client...' })
  
  return message.editReply(`🏓 | Pong!\n⏱️ | Latency: **${messageTimestamp - message.createdTimestamp}ms** \n⚡| API Latency: **${Math.round(message.client.ws.ping)}ms**`);
};

module.exports = {
  names: ['ping'],
  run: ping,
  data: {
    name: 'ping', 
    description: 'Comando para ver o ping do bot'
  }
}