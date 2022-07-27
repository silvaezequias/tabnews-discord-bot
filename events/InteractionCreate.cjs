
function InteractionCreate(client) {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    var command = interaction.commandName
    var requested_command = client.slashs.get(command);
    requested_command?.run(client, interaction);
  });
}

module.exports = {
  name: 'Evento de Interação',
  run: InteractionCreate
}