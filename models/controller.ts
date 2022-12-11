import { BaseError, InternalServerError } from 'errors';
import { CommandInteraction, EmbedBuilder } from 'discord.js';
import ExtendedClient from 'client';
import logger from 'infra/logger';
import settings from 'settings';

export function onErrorHandler(
  error: BaseError,
  interaction: CommandInteraction,
  client: ExtendedClient
) {
  const errorObject = new InternalServerError({
    requestId: interaction.user.id,
    message: error.message,
    action: error.action,
    stack: error.stack,
    errorId: error.errorId,
    context: error.context,
    databaseErrorCode: error.databaseErrorCode,
    errorLocationCode: error.errorLocationCode,
    key: error.key,
    statusCode: error.statusCode,
    type: error.type
  });

  const errorEmbed = new EmbedBuilder()
    .addFields(
      { name: 'Problema Encontrado', value: errorObject.message },
      { name: 'Solução', value: errorObject.action }
    )
    .setFooter({ text: `ErrorId: ${errorObject.errorId}` })
    .setTimestamp(new Date())
    .setColor(0xff5353);

  (error.log ?? settings.log.enabled) && logger(errorObject, client);

  interaction
    .editReply({
      embeds: [errorEmbed]
    })
    .catch(() => {
      interaction.reply({
        embeds: [errorEmbed],
        ephemeral: true
      });
    });
}
