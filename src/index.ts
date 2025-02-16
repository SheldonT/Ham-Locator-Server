/** @format */

import fs from "fs";
import https from "https";
import express, { Express } from "express";
import { ExpressLoader } from "./loaders/express-loader";
import dotenv from "dotenv";

async function start() {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT;
  const frontEndHost = process.env.FRONT_END_HOST;
  const secret = process.env.SECRET;

  const certFiles = {
    key: fs.readFileSync("/etc/letsencrypt/live/hamlocator.space/privkey.pem"),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/hamlocator.space/fullchain.pem"
    ),
  };

  ExpressLoader(app, frontEndHost, secret);

  /*
  https
    .createServer(certFiles, app)
    .listen(port, () =>
      console.log(
        `[server]: Ham-Locator-Server 1.16 is running on port ${port}`
      )
    )
    .on("error", (err) => {
      console.log(`[server]: Error while starting server => ${err}`);
      process.exit(1);
    })
    .on("close", async () => {
      console.log(`[server]: Server closed`);
    });
  */
}

start();

////"start": "nodemon ./src/index.ts --watch src --ext js,mjs,json,ts",
//"main": "index.ts",
