
function ChangeIcon(client){
  client.on('changeStatus', () => {
    let icons = [
      { path: "./icons/principal.png" },
      { path: "./icons/tired.png" },
      { path: "./icons/Oo.png" },
      { path: "./icons/angry.png" },
      { path: "./icons/love.png" },
      { path: "./icons/rip.png" },
      { path: "./icons/exhausted.png" },
      { path: "./icons/sleeping.png" }
    
        ]
    
    function setIcons() {
      let randomIcon = icons[Math.floor(Math.random() * icons.length)]
      client.user.setAvatar(randomIcon.path);
    }
    setIcons();
    setInterval(() => setIcons(), 6000);
  });
}

module.exports = {
  name: 'Evento Para Mudar o avatar do Bot',
  run: ChangeIcon
}
