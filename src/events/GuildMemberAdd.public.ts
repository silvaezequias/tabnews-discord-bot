import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";
import { Event } from "interfaces";
import ExtendedClient from "client";

export default {
  name: 'guildMemberAdd',
  run: (client: ExtendedClient, member: GuildMember) => {
    const message_embed = new EmbedBuilder()
      .setTitle('Boas Vindas!!')
      .setDescription(`Olá **${member.user.username}**, seja bem-vindo(a). Estamos contentes por você ter se juntado à nós.`)
      .setImage('https://i.imgur.com/UnzjJG1.png')
      .setTimestamp(new Date())
      .setColor('#2DCF46');

    const log_channel = client.channels.cache.get(
      client.settings.log.member.joined.channelId
    );

    if (log_channel.isTextBased()) {
      (<TextChannel>log_channel)?.send({
        content: member.user.toString(),
        embeds: [message_embed]
      });
    }
  }
} as Event