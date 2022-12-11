import {
  RoleData,
  EmbedBuilder,
  APIEmbedField,
  ApplicationCommandOptionType
} from 'discord.js';
import { Command } from 'interfaces';
import format from 'models/format';

export default {
  data: {
    name: 'userinfo',
    description: 'Mostrar informações de um usuário',
    options: [
      {
        name: 'usuário',
        description: 'Insira um usuário',
        required: false,
        type: ApplicationCommandOptionType.User
      }
    ]
  },
  run: (client, interaction) => {
    const user = interaction.options.getUser('usuário') || interaction.user;
    const member = interaction.guild.members.cache.get(user?.id);

    const roles = member.roles.cache.map((role) =>
      role.toString()
    ) as RoleData[];
    const permissions = member.permissions.toArray() as string[];
    permissions.splice(14, 0, `\`+${permissions.length - 15}\`.`);

    const fields: APIEmbedField[] = [];

    fields.push({
      name: 'Entrou',
      inline: true,
      value: format.date(member.joinedAt)
    });

    fields.push({
      name: 'Registrou',
      inline: true,
      value: format.date(member.user.createdAt)
    });

    roles.length &&
      fields.push({
        name: `Cargos [${roles.length}]`,
        value: roles.join(', ')
      });

    permissions.length &&
      fields.push({
        name: 'Permissões',
        value: permissions.slice(0, 15).join(', ')
      });

    const responseEmbed = new EmbedBuilder()
      .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
      .setFooter({ text: `ID: ${member.id}` })
      .setThumbnail(member.user.avatarURL())
      .setDescription(`${member.user}`)
      .setColor(member.displayHexColor)
      .setTimestamp(new Date())
      .addFields(fields);

    interaction.reply({
      embeds: [responseEmbed]
    });
  }
} as Command;
