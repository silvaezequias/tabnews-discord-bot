import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";
import { Event } from "interfaces";
import ExtendedClient from "client";

export default {
  name: 'guildMemberRemove',
  run: (client: ExtendedClient, member: GuildMember) => {
    const message_embed = new EmbedBuilder()
      .setTitle('Até Mais!!')
      .setDescription(`Tchau **${member.user.username}** :cry: Ficamos tristes que tenha realmente que sair!! Esperamos que volte algum dia.`)
      .setImage('https://i.imgur.com/B0LQpbA.png')
      .setTimestamp(new Date())
      .setColor('#bf3c37');

    const log_channel = client.channels.cache.get(
      client.settings.log.member.left.channelId
    );

    (<TextChannel>log_channel)?.send?.({
      embeds: [message_embed]
    });
  }
} as Event
