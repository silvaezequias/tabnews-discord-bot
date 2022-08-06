const { MessageEmbed, Constants } = require('discord.js');
var moment = require('moment');
moment.locale('pt-BR');

function SlashCommand(client, message) {
  var user = message.options.getUser('usuário');
  var guild = message.guild;
  var member = guild?.members.cache.get(user?.id);

  var roles = member._roles.map(role => `<@&${role}>`);
  var permissions = member.permissions.toArray().map(perm => perm.toLowerCase());
  var registeredAt = moment.utc(member.user.createdAt);
  var joinedAt = moment.utc(member.joinedAt);

  permissions.splice(14, 0, `\`+${permissions.length - 15}\`.`);
  permissions = permissions.map(perm => {
    return perm.split('_').map(each => {
      var capitalized = each.charAt(0).toUpperCase() + each.slice(1);
      return capitalized
    }).join(' ');
  });

  var message_embed = new MessageEmbed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL()})
    .setFooter({ text: `ID: ${member.id}` })
    .setThumbnail(member.user.avatarURL())
    .setDescription(`${member.user}`)
    .setColor(member.displayHexColor)
    .setTimestamp(new Date())
    .addFields(
      {
        name: 'Entrou', inline: true,
        value: `\`${joinedAt.fromNow()}\` (${joinedAt.format('DD/MM/YY')})`
      },
      {
        name: 'Registrou', inline: true,
        value: `\`${registeredAt.fromNow()}\` (${registeredAt.format('DD/MM/YY')})`
      },
      { name: `Cargos [${roles.length}]`, value: roles.join(', ') },
      { name: 'Permissões', value: permissions.slice(0, 15).join(', ') }
    );
    
  message.reply({
    embeds: [message_embed]
  });
};

module.exports = {
  names: ['userinfo', 'user'],
  run: SlashCommand,
  data: {
    name: 'userinfo',
    description: 'Mostrar informações de um usuário',
    options: [
      {
        name: 'usuário',
        description: 'Insira um usuário',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.USER
      }
    ]
  }
};