
function BotReady(client){
  client.on('ready', () => {
    var guild_id = 997643740581736530;
    var guild = client.guilds.cache.get(guild_id);
    var commands;

    if (guild) { commands = guild.commands }
    else { commands = client.application?.commands };

    client.slashs.forEach(command => {
      commands?.create(command.data);
    })

    client.emit('changeStatus');
  });
};

module.exports = {
  name: 'Evento de Inicialização',
  run: BotReady
};
