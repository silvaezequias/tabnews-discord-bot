import { Event } from "interfaces";
import environment from "infra/environment";
import commands from 'models/commands';

export default {
  name: 'ready',
  run: async (client) => {
    var guild = client.guilds.cache.get(
      client.settings.default.guildId,
    );

    if (environment.isProduction()) {
      await commands.reset(client, guild);
    }

    await commands.create(client, guild);
    console.log('[Discord] Aplicação conectada com sucesso: ' + client.user.tag);
  },
} as Event;