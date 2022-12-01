import Express from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';

config();

const express_app = Express();
const http_server = createServer(express_app);

express_app.get('/*', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'OK',
  });
});

function init(): void {
  http_server.listen(process.env.PORT, () => {
    console.log(`[HTTP] Servidor conectado na porta ${process.env.PORT}`);
  });
}

export default {
  init,
}