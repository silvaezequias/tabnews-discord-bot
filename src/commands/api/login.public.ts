import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { NotFoundError, UnauthorizedError } from 'errors';
import { Command } from 'interfaces';
import secureDefer from 'wait';
import tabnews from 'models/tabnews';
import user from 'models/user';

export default {
  data: {
    name: 'login',
    description: 'Conecte com sua conta do TabNews',
    options: [
      {
        name: 'email',
        description: 'Insira seu email usado no TabNews',
        required: true,
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'senha',
        description: 'Insira sua senha usada no TabNews',
        required: true,
        type: ApplicationCommandOptionType.String
      }
    ]
  },
  run: async (client, interaction) => {
    const email = interaction.options.get('email', true).value;
    const password = interaction.options.get('senha', true).value;

    interaction.deferReply({ ephemeral: true });
    await secureDefer(700);

    const { error: sessionError, data: session } = await tabnews.createSession({ email, password });

    if (sessionError) {
      throw new UnauthorizedError({
        message: sessionError.message,
        action: sessionError.action,
        errorLocationCode: sessionError.error_location_code,
        errorId: sessionError.error_id,
        key: sessionError.key,
        statusCode: sessionError.status_code,
        log: false,
      });
    };

    await user.insertSession(interaction.user.id, session);
    var { error: loginError, data: loggedUser } = await tabnews.getUserBySessionToken(session.token);

    if (loginError) {
      throw new NotFoundError({
        message: 'Usuário não encontrado no sistema ou o token de sessão expirou.',
        action: 'Faça login novamente ou registre uma nova conta.',
        log: false,
      });
    };

    const successEmbed = new EmbedBuilder()
      .setAuthor({
        name: 'Usuário Conectado',
        url: `${tabnews.getWebsiteUrl()}/${loggedUser.username}`,
        iconURL: `https://i.imgur.com/iRsWUil.png`
      })
      .setDescription(
        `Bem-vindo(a) de volta **${loggedUser.username}**!\n` +
        `Seu login foi realizado com sucesso.`
      )
      .setColor('#3EB34A')
      .setTimestamp(new Date());

    interaction.editReply({
      embeds: [successEmbed]
    });
  }
} as Command;