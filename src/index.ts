import express, { Express } from 'express';
import dotenv from 'dotenv';
import { ExpressLoader } from './loaders/express-loader';

async function start(){
  dotenv.config()
  const app: Express = express();
  const port = process.env.PORT;

  ExpressLoader(app);

  app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
    .on('error', (err) => {
      console.log(err)
      process.exit(1);
    })
    .on('close', async () => {
      console.log('SERVER CLOSE')
    });
}

start();
