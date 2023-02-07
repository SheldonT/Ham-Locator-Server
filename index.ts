import express from 'express';
import * as dotenv from 'dotenv'
import { ExpressLoader } from './loaders/express-loader';

async function start(){
  dotenv.config()
  const app = express();
  const port = process.env.PORT;

  // ExpressLoader(app);

  await ExpressLoader(app);

  app.get('/', function (_req, res) {
    res.send('Hello World!');
  });

  const server = app
    .listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    })
    .on('error', (err) => {
      console.log(err)
      process.exit(1);
    })
    .on('close', async () => {
      console.log('SERVER CLOSE')
    });
  process.on('SIGINT', async () => { //si
    server.close();
  });
}

start();
