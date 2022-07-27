const Discord = require('discord.js');

function ExemploDeEstruturaDeComando(client, message) {
  var message_embed = new Discord.MessageEmbed()
    .setTitle('TabNews')
    .setDescription('Uma incrível e tecnológica comunidade. [TabNews.com.br](https://tabnews.com.br)')
    .addField(
      'Contribua conosco',
      'Você pode contribuir no projeto OpenSource desse Bot lá no github. [tabnews-discord-bot](https://github.com/ezequiaslopesdasilva/tabnews-discord-bot)'
    )
    .setImage('https://i.imgur.com/D0Yz3Bw.png')
    .setColor('#4287f5');

  message.channel.send({
    embeds: [message_embed]
  });
};

module.exports = {
  names: ['exemplo', 'comando-exemplo'],
  run: ExemploDeEstruturaDeComando
}