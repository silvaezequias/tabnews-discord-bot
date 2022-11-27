
function ChangeStatus(client){
  client.on('changeStatus', () => {
   var guild = client.guilds.cache.get('997643740581736530'); // Servidor TabNews
    var guild_members_size = guild.memberCount;

    let status = [
      { name: `Contamos com ${guild_members_size} membros 👏`, type: 'WATCHING' },
      { name: `Acesse tabnews.com.br`, type: 'STREAMING' }
    
        ]
    
    function setStatus() {
      let randomStatus = status[Math.floor(Math.random() * status.length)]
      client.user.setActivity(randomStatus.name, { type: randomStatus.type })
    }
    setStatus();
    setInterval(() => setStatus(), 60000);
  });
}

module.exports = {
  name: 'Evento Para Mudar o Status de Atividade do Bot',
  run: ChangeStatus
}
