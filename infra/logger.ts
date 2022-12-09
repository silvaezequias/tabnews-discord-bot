import { AttachmentBuilder, TextChannel } from 'discord.js';
import { BaseError } from 'errors';
import settings from 'settings';
import ExtendedClient from 'client';
import environment from './environment';

export default function logger(error: BaseError, client: ExtendedClient) {
  if (environment.isProduction()) {
    const errorObject: BaseError = {
      name: error.name,
      message: error.message,
      action: error.action,
      stack: error.stack,
      errorId: error.errorId,
      context: error.context,
      databaseErrorCode: error.databaseErrorCode,
      errorLocationCode: error.errorLocationCode,
      key: error.key,
      requestId: error.requestId,
      statusCode: error.statusCode,
      type: error.type,
      log: error.log,
    };

    const logContent = JSON.stringify(errorObject, null, 2);
    const contentBuff = Buffer.from(logContent);

    var messageAttachment = new AttachmentBuilder(contentBuff, {
      name: `${errorObject.errorId}.json`
    });

    const logChannel = client.channels.cache.get(settings.log.error.channelId);

    if (logChannel?.isTextBased()) {
      (<TextChannel>logChannel).send({
        content: `**${errorObject.errorId}**`,
        files: [messageAttachment],
      });
    };
  } else {
    console.log(error);
  }
}