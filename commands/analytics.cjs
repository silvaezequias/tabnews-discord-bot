const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { MessageEmbed } = require('discord.js');

async function getRootContentPublished(){
  var response = await fetch('https://tabnews.com.br/api/v1/analytics/root-content-published');
  var responseBody = await response.json();

  var max_length = 200;
  var max_value = responseBody.map(value => value.conteudos).reduce((a, b) => Math.max(a, b));
  
  responseBody = responseBody.map(value => ({ date: value.date, conteudos: Math.round((value.conteudos / 100) * max_value) }));
  responseBody = responseBody.map(value => {

    var filled = '■'.repeat(value.conteudos);
    var empty = '□'.repeat(10 - value.conteudos);
    var progressBar = `[${filled + empty}]`;
    value.conteudos = `${progressBar}`;
    return value;
  });

  return responseBody.slice(0, max_length);
};

async function Analytics(client, message){
  const root_content_published = await getRootContentPublished();
  
  var div = 50;
  var length = Math.floor(root_content_published.length / div);
  var content_bar = [];

  
  for (let i = 0; i < length; i++){
    var root = root_content_published.slice(i * div, div);
    root.forEach(value => {
      content_bar[i] = [content_bar[i], `${value.conteudos} - [${value.date}]`].join(' | '); 
    })
  }
  console.log(length, content_bar.length);

  var embed = new MessageEmbed()
  .setTitle('Analytics - [Teste 1]')
  .setDescription(
    content_bar.join('\n')
  );

  message.channel.send({ embeds: [embed] });
};

module.exports = {
  names: ['status'],
  run: Analytics
}