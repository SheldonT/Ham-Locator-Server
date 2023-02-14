import express, { Express } from 'express';
import dotenv from 'dotenv';
import { ExpressLoader } from './loaders/express-loader';

async function start(){
  dotenv.config()
  const app: Express = express();
  const port = process.env.PORT;

  /**
   * Wanted to add some thoughts here before we integrate MySQL into this project
   * 
   * We can either establish connection in a loader and .on('close', ...) of the app
   * we could close that connection
   * 
   * OR
   * 
   * Everytime we utilize the DB class/functions we can establish connection and close connection
   * with each use.
   * 
   */
  
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
