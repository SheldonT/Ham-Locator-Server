/** @format */

import express from "express";

import { Routes } from "../controllers/routes";
import Conn from "../database";
import cors from "cors";
import session from "express-session";

import * as expressSession from "express-session";
import expressMySqlSession from "express-mysql-session";

export const ExpressLoader = (app: express.Application): void => {
  const dbConn = new Conn();
  const MySQLStore = expressMySqlSession(expressSession);
  const sessionStore = new MySQLStore({}, dbConn.connection);

  app.use(cors({ origin: "*" }));

  app.use(express.json({ limit: "1mb" }));

  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  app.use(Routes(dbConn));

  console.log("[server]: Express Loaded...");
};
