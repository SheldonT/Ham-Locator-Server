/** @format */

import express from "express";

import { Routes } from "../controllers/routes";
import Conn from "../database";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import expressSession, { SessionOptions } from "express-session";
import { RequestHandler } from "express-serve-static-core";
import connectPgSimple from "connect-pg-simple";

import dotenv from "dotenv";

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
    user: string;
  }
}

export const ExpressLoader = (
  app: express.Application,
  feHost: any,
  secret: any
): void => {
  const dbConn = new Conn();

  //sessions options object of custom store option type defined above, with serializer function.
  const sessionOptions = {
    pgPromise: dbConn.pgConn,
    tableName: "session",
  };

  const pgSession = connectPgSimple(
    expressSession as (options?: SessionOptions) => RequestHandler
  );
  const pgStore = new pgSession(sessionOptions);

  dotenv.config();

  app.set("trust proxy", 1);

  app.use(cors({ origin: feHost, credentials: true }));

  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser(secret));
  app.use(
    session({
      secret: secret,
      resave: false,
      saveUninitialized: false,
      store: pgStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
        //httpOnly: true,
        secure: true,
      },
    })
  );

  app.use(Routes(dbConn));

  console.log("[server]: Express Loaded...");
};
