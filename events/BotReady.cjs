
function BotReady(client){
  client.on('ready', () => {
    client.user.setActivity('tabnews.com.br');
  });
}

module.exports = {
  name: 'Evento de Inicialização',
  run: BotReady
}
