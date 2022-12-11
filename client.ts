/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Collection } from 'discord.js';
import { Command } from 'interfaces';

import settings from 'settings';
import glob from 'glob';
import path from 'path';

export default class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public settings = settings;

  public async init() {
    this.login(this.settings['token']);

    glob.sync('**/commands/**/**.public.ts').forEach((commandPath) => {
      const { default: command } = require(path.join(__dirname, commandPath));
      this.commands.set(command.data.name, command);
    });

    glob.sync('**/events/**/**.public.ts').forEach((eventPath) => {
      const { default: event } = require(path.join(__dirname, eventPath));

      this.on(event.name, (...args) => {
        event.run(this, ...args);
      });
    });
  }
}
