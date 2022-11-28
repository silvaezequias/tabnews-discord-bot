const Express = require('express');
const { createServer } = require('http');
const { config } = require('dotenv');

const express_app = Express();
const http_server = createServer(express_app);

express_app.get('/*', (req, res) => {
  res.json({ status: 200, message: 'OK' });
});

http_server.listen(process.env.PORT, () => {
  console.log(`[HTTP] Servidor conectado na porta ${process.env.PORT}`);
});
