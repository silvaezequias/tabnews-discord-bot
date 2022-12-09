import { EmbedBuilder } from 'discord.js';
import { Command } from 'interfaces';
import tabnews from 'models/tabnews';

export default {
  data: {
    name: 'ping',
    description: 'Mostrar a latência do bot',
  },
  run: async (client, interaction) => {
    var time = Date.now();
    await tabnews.getStatus();

    var responseEmbed = new EmbedBuilder()
      .setTitle('Pong! 🏓')
      .setDescription(
        `🌐| Latência da API: **${Date.now() - time}ms**\n` +
        `⏱️| Latência da Mensagem: **${Date.now() - interaction.createdTimestamp}ms**\n` +
        `⚡| Latência da Aplicação: **${Math.round(interaction.client.ws.ping)}ms**`
      )
      .setColor(0x24292F);

    return interaction.reply({
      embeds: [responseEmbed]
    });
  }
} as Command;

