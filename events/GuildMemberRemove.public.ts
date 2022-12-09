import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";
import { Event } from "interfaces";
import ExtendedClient from "client";

export default {
  name: 'guildMemberRemove',
  run: (client: ExtendedClient, member: GuildMember) => {
    const messageEmbed = new EmbedBuilder()
      .setTitle('Até Mais!!')
      .setDescription(`Tchau **${member.user.username}** :cry: Ficamos tristes que tenha realmente que sair!! Esperamos que volte algum dia.`)
      .setImage('https://i.imgur.com/B0LQpbA.png')
      .setTimestamp(new Date())
      .setColor('#bf3c37');

    const logChannel = client.channels.cache.get(
      client.settings.log.member.left.channelId
    );

    if (logChannel.isTextBased()) {
      (<TextChannel>logChannel)?.send?.({
        embeds: [messageEmbed]
      });
    }
  }
} as Event
