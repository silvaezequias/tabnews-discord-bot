# TabNews Discord Bot
Esse é um projeto Typescript de uma aplicação (que interage com a API do [tabnews.com.br](https://tabnews.com.br/)) para o servidor do TabNews no Discord: https://discord.gg/4dHTjAmw3z.

## Instalação do Projeto
O único requisito para instalar e rodar o projeto é ter o Node instalado:

-  [NodeJS LTS v16](https://nodejs.org/uk/blog/release/v16.18.0/) (ou versão superior)

Se você usa o `nvm`, então pode executar `nvm install` na pasta do projeto para instalar e utilizar a versão mais apropriada do Node.js.

### Instalar dependências necessárias
Com o node instalado a partir da versão 16, basta instalar as dependências necessárias para rodar o projeto com o `NPM` (Podes utilizar o `yarn` se preferir):

```
npm install
```

## Rodar o projeto

Para iniciar o projeto é necessário definir algumas variáveis importantes para o funcionamento da aplicação. No arquivo `.env`, você precisa definir as seguintes variáveis:

- `PORT` - Porta para servidor HTTP, como desenvolvimento você pode definir `8080`.
- `TOKEN` - Token **Secreto** de conexão com a sua [aplicação Discord](https://discord.com/developers/applications).
- `DATABASE_URL` - Alguns comandos requer o uso do banco de dados, então é necessário criar um banco de dados no [MongoDB](https://mongodb.com/) e adicionar aqui a URL criada.

<!--
TODO: Add a local development-only database
-->

```env
# .env
PORT=8080
TOKEN="discord-token"
DATABASE_URL="mongodb-url"
```

Após definidas as variáveis necessárias, só resta iniciar o projeto. Para iniciar use o seguinte comando:

```
npm run dev
```

Se tudo estiver instalado corretamente, o projeto iniciará com sucesso.

### Atenção
A aplicação criada lá no site do Discord, quando adicionada em um servidor, precisa ter a permissão de [`Application Commands`](https://discord.com/developers/docs/interactions/application-commands#:~:text=The%20command%20permissions%20interface%20can,user%2C%20role%2C%20or%20channel.). 
Sem essa permissão, não terá como usar os comandos por barra no Discord.

## Contribuidores

<a href="https://github.com/ezequiaslopesdasilva/tabnews-discord-bot/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=ezequiaslopesdasilva/tabnews-discord-bot&max=500" alt="Lista de contribuidores"/>
</a>
