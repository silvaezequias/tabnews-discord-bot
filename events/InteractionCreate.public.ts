import { onErrorHandler } from 'models/controller';
import { CommandInteraction } from 'discord.js';
import { Command, Event } from 'interfaces';
import ExtendedClient from 'client';

export default {
  name: 'interactionCreate',
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;

    const command = interaction.commandName;
    const requestedCommand: Command = client.commands.get(command);

    try {
      await requestedCommand?.run(client, interaction);
    } catch (error) {
      onErrorHandler(error, interaction, client);
    }
  }
} as Event;
