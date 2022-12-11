import Express from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';

config();

const expressApp = Express();
const httpServer = createServer(expressApp);

expressApp.get('/*', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'OK'
  });
});

function init(): void {
  httpServer.listen(process.env.PORT, () => {
    console.log(`[HTTP] Servidor conectado na porta ${process.env.PORT}`);
  });
}

export default {
  init
};
