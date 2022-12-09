import {
  REST, Guild, Routes,
  ApplicationCommandManager,
  GuildApplicationCommandManager,
} from 'discord.js';

import { Command } from 'interfaces';
import settings from "settings";
import Client from 'client';

type CommandManager = ApplicationCommandManager | GuildApplicationCommandManager;
const rest = new REST({ version: '10' }).setToken(settings.token);

async function create(client: Client, guild?: Guild) {
  var targetCommands: CommandManager = guild
    ? guild.commands
    : client.application.commands

  client.commands.forEach(async (command: Command) => {
    await targetCommands?.create(command.data);
  });
}

async function reset(client: Client, guild: Guild) {
  var routeCommands: `/${string}` = guild
    ? Routes.applicationGuildCommands(client.user.id, guild.id)
    : Routes.applicationCommands(client.user.id);

  await rest.put(routeCommands, { body: [] }).then(() => console.log(
    `[Discord] Slash - Comandos ${guild ? 'de servidor' : 'globais'} resetados.`
  )).catch(console.error);
}

export default {
  create,
  reset
}