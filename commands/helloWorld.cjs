
function helloWorld(client, message){
  message.reply({
    content: 'Olá!',
    allowedMentions: { repliedUser: false }
  });
;}

module.exports = {
  names: ['ola-mundo', 'hello-world'],
  run: helloWorld
};
