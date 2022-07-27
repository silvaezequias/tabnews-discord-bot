const { MessageEmbed } = require("discord.js");
const { bot: { prefix } } = require('../settings.json');

function MessageCreationEvent(client) {
  client.on('messageCreate', message => {
    if (message.author.bot) return;

    var message_arguments = message.content.split(' ');
    var command = message_arguments[0].slice(prefix.length).toLowerCase();
    var requested_command = client.commands.get(command);
    var mention_regExp = new RegExp(`<@!?${client.user.id}>`);

    if (message_arguments.length > 1) return;
    if (mention_regExp.test(message_arguments[0])) {
      var response_embed = new MessageEmbed()
        .setTitle('TabNew Bot')
        .setDescription(`Olá, eu sou o Bot oficial desse servidor. Meu prefixo é \`${prefix}\` e para saber meus comandos use \`${prefix}comandos\`.`)
        .setTimestamp(new Date())
        .setColor('#4287f5');
      message.reply({
        embeds: [response_embed],
        allowedMentions: { repliedUser: false }
      });
    }

    requested_command?.run(client, message);
  });
}

module.exports = {
  name: 'Evento de Mensagem',
  run: MessageCreationEvent
}