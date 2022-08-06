const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { MessageEmbed, Constants } = require('discord.js');
const { Database } = require('secure-db');

const DATABASE_TOKEN = process.env.SECURE_DB;
const API_URL = 'https://www.tabnews.com.br/api/v1/';

async function getUserByToken(token){
  const response = await fetch(API_URL + 'user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'cookie': `session_id=${token}`
    }
  });
  var responseBody = await response.json();
  return responseBody
};

async function login(email, password){
  var response = await fetch(API_URL + 'sessions', {
    method: 'POST', headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  var responseBody = await response.json();
  return responseBody
};

async function SlashCommand(client, message) {
  var Account = new Database('account');
  var User = new Account.Section('users', message.user.id);

  message.deferReply({
    content: 'Processando...',
    ephemeral: true
  });

  User.security({
    key: DATABASE_TOKEN,
    output: 'base64',
    section: 'save as',
    path: 'north-map',
    mode: 'hard'
  });

  var email = message.options.getString('email');
  var password = message.options.getString('senha');
  var user_login = await login(email, password);

  if (!user_login?.token) {
    var error_embed = new MessageEmbed()
    .setTitle('Algo deu errado!')
    .setDescription('Verifique se os dados enviados estão corretos')
    .setFooter({ text: 'Não salvamos sua senha nem email' })
    .setTimestamp(new Date())
    .setColor('RED');

    return message.editReply({
      embeds: [error_embed],
      ephemeral: true
    });
  };

  var tab_user = await getUserByToken(user_login.token);
  var success_embed = new MessageEmbed()
  .setTitle('Usuário Conectado!')
  .setDescription(
    `Bem-vindo(a) de volta **${await tab_user.username}**!\n` +
    `Seu login foi realizado com sucesso.`
  )
  .setFooter({ text: 'Não salvamos sua senha nem email' })
  .setTimestamp(new Date())
  .setColor('GREEN');
  
  await message.editReply({
    embeds: [success_embed],
    ephemeral: true
  });

  User.set('user', {
    id: tab_user.id,
    username: tab_user.username,
    features: tab_user.features,
    tabcoins: tab_user.tabcoins,
    tabcash: tab_user.tabcash,
    created_at: tab_user.created_at,
    updated_at: tab_user.updated_at,
  });

  User.set('session', {
    id: user_login.id,
    token: user_login.token,
    expires_at: user_login.expires_at,
    created_at: user_login.created_at,
    updated_at: user_login.updated_at,
    last_user_access: (new Date()).toJSON()
  });
};

module.exports = {
  names: ['login', 'conectar'],
  run: SlashCommand,
  data: {
    name: 'login',
    description: 'Faça login com sua conta do TabNews.',
    options: [
      {
        name: 'email',
        description: 'Insira eu email',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'senha',
        description: 'Insira sua senha',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      }
    ]
  }
};