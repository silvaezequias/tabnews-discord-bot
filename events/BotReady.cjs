
function BotReady(client){
  client.on('ready', () => {
    var guild_id = 1046275621795418273//997643740581736530;
    var guild = client.guilds.cache.get(guild_id);
    var commands;

    if (guild) { commands = guild.commands }
    else { commands = client.application?.commands };

    client.slashs.forEach(command => {
      commands?.create(command.data);
    })

    client.emit('changeStatus');
    console.log(`[DISCORD] ${client.user.tag} is online`);
  });
};

module.exports = {
  name: 'Evento de Inicialização',
  run: BotReady
};
