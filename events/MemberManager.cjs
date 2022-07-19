const Discord = require('discord.js');
const settings = require('../settings.json');

function NewMember(client){
  client.on('guildMemberAdd', member => {
    client.emit('changeStatus', member);

    const message_embed = new Discord.MessageEmbed()
    .setTitle('Boas Vindas!!')
    .setDescription(`Olá <@${member.user.id}>, seja bem-vindo(a). Estamos contentes por você ter se juntado à nós.`)
    .setImage('https://i.imgur.com/UnzjJG1.png')
    .setTimestamp(new Date())
    .setColor('#2dcf46');

    const log_channel = client.channels.cache.get(settings.log.member_joined);
    log_channel.send({
      embeds: [message_embed]
    })
  });
}

function MemberLeft(client){
  client.on('guildMemberRemove', ({user}) => {
    client.emit('changeStatus', user);

    const message_embed = new Discord.MessageEmbed()
    .setTitle('Até Mais!!')
    .setDescription(`Tchal **${user.username}** :cry: Ficamos tristes que tenha realmente que sair!! Esperamos que volte algum dia.`)
    .setImage('https://i.imgur.com/B0LQpbA.png')
    .setTimestamp(new Date())
    .setColor('#bf3c37');

    const log_channel = client.channels.cache.get(settings.log.member_left);
    log_channel.send({
      embeds: [message_embed]
    })
  });
}

function Main(client){
  NewMember(client);
  MemberLeft(client);
}

module.exports = {
  name: 'Evento de Recepção',
  run: Main
}
