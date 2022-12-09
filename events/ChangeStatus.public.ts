import { ActivityType, PresenceStatusData } from 'discord.js';
import { Event } from "interfaces";
import environment from "infra/environment";
import tabnews from 'models/tabnews';

type CustomStatusProps = {
  url?: string,
  message: string,
  status?: PresenceStatusData,
  type: ActivityType.Playing
  | ActivityType.Listening
  | ActivityType.Streaming
  | ActivityType.Competing
  | ActivityType.Watching,
}

export default {
  name: 'ready',
  run: (client) => {
    var guild = client.guilds.cache.get(
      client.settings.default.guildId,
    );

    const customProductionStatus: CustomStatusProps[] = [{
      message: `${guild.memberCount} membros`,
      type: ActivityType.Playing,
    }, {
      message: `Acesse ${tabnews.getWebsiteUrl()}`,
      type: ActivityType.Streaming,
      url: tabnews.getWebsiteUrl(),
    }]

    function changeStatus({ status = 'online', message, type, url }: CustomStatusProps) {
      client.user.setPresence({
        status: status,
        activities: [{
          name: message,
          type: type,
          url: url
        }]
      });
    }

    if (environment.isProduction()) {
      var currentIndex = -1;

      setInterval(function () {
        (currentIndex + 1) < customProductionStatus.length ?
          ++currentIndex : (currentIndex = 0);

        var currentItem = customProductionStatus[currentIndex];
        currentItem && changeStatus(currentItem);
      }, (60 * 1000) * 2); // A cada 2 minutos

    } else {
      changeStatus({
        status: 'idle',
        message: `[Desenvolvimento]`,
        type: ActivityType.Watching,
      });
    }
  }
} as Event;