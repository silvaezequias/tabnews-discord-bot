
function ChangeStatus(client){
  client.on('changeStatus', () => {
    var guild = client.guilds.cache.get('997643740581736530'); // Servidor TabNews
    var guild_members_size = guild.memberCount;

    client.user.setActivity(`${guild_members_size} membros`, {
      type: 'LISTENING'
    });
  });
}

module.exports = {
  name: 'Evento Para Mudar o Status de Atividade do Bot',
  run: ChangeStatus
}
