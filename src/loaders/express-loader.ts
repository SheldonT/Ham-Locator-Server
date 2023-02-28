/** @format */

import express from "express";
import { Routes } from "../controllers/routes";

import Conn from "../database";
import cors from "cors";

export const ExpressLoader = (app: express.Application): void => {
  const dbConn = new Conn();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.use(Routes(dbConn));

  console.log("[server]: Express Loaded...");
};
