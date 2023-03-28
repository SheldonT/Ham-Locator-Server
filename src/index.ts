/** @format */

import express, { Express } from "express";
import { ExpressLoader } from "./loaders/express-loader";
import dotenv from "dotenv";

async function start() {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT;

  ExpressLoader(app);

  app
    .listen(port, () =>
      console.log(`[server]: Server is running on port ${port}`)
    )
    .on("error", (err) => {
      console.log(`[server]: Error while starting server => ${err}`);
      process.exit(1);
    })
    .on("close", async () => {
      console.log(`[server]: Server closed`);
    });
}

start();
