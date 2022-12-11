import Client from 'client';
import Server from 'server';

const client = new Client({ intents: 112383 });

Server.init();
client.init();
