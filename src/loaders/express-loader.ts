/** @format */

import express from "express";

import { Routes } from "../controllers/routes";
import Conn from "../database";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import expressMySqlSession from "express-mysql-session";
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
  const MySQLStore = expressMySqlSession(expressSession);
  const sessionStore = new MySQLStore({}, dbConn.connection);
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
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
        secure: true,
      },
    })
  );

  app.use(Routes(dbConn));

  console.log("[server]: Express Loaded...");
};
