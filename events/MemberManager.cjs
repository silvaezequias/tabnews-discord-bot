
function NewMember(client){
  client.on('guildMemberAdd', member => {
    client.emit('changeStatus', member);
  });
}

function MemberLeft(client){
  client.on('guildMemberRemove', member => {
    client.emit('changeStatus', member);
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
