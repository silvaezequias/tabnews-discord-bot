import Client from 'client';
import { ApplicationCommandOption, CommandInteraction } from 'discord.js';

export interface Command {
  run(client: Client, interaction: CommandInteraction): void;
  data: {
    name: string;
    description: string;
    type?: number;
    options?: ApplicationCommandOption[];
  };
}
