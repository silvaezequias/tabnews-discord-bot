function MessageCreationEvent(client){
  client.on('messageCreate', message => {
    if (message.author.bot) return;

    var prefix = '!';
    var message_arguments = message.content.split(' ');
    var command = message_arguments[0].slice(prefix.length);
    var requested_command = client.commands.get(command);

    requested_command?.run(client, message);
  });
}

module.exports = {
  name: 'Evento de Mensagem',
  run: MessageCreationEvent
}