
function BotReady(client){
  client.on('ready', () => {
    client.emit('changeStatus');
  });
};

module.exports = {
  name: 'Evento de Inicialização',
  run: BotReady
};
