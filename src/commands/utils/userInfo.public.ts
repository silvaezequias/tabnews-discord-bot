import {
  RoleData,
  EmbedBuilder, APIEmbedField,
  ApplicationCommandOptionType,
} from 'discord.js';
import { Command } from 'interfaces';

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
      },
    ],
  },
  run: (client, interaction) => {
    var user = interaction.options.getUser('usuário') || interaction.user;
    var member = interaction.guild.members.cache.get(user?.id);

    var roles = member.roles.cache.map(role => role.toString()) as RoleData[];
    var permissions = member.permissions.toArray() as string[]
    permissions.splice(14, 0, `\`+${permissions.length - 15}\`.`);

    function formatDate(date: Date): `<t:${number}:f>` {
      return `<t:${Math.round((new Date(date)).getTime() / 1000)}:f>`
    }

    const fields: APIEmbedField[] = [];

    fields.push({
      name: 'Entrou', inline: true,
      value: formatDate(member.joinedAt),
    });

    fields.push({
      name: 'Registrou', inline: true,
      value: formatDate(member.user.createdAt),
    });

    roles.length && fields.push({
      name: `Cargos [${roles.length}]`,
      value: roles.join(', '),
    });

    permissions.length && fields.push({
      name: 'Permissões',
      value: permissions.slice(0, 15).join(', '),
    });

    var responseEmbed = new EmbedBuilder()
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

