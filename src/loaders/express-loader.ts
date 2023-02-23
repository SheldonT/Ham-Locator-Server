/** @format */

import express from "express";
import { Routes } from "../controllers/routes";
import Conn from "../database";
import cors from "cors";

export const ExpressLoader = (app: express.Application): void => {
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.use(Routes(new Conn())); //assign Conn to variable

  console.log("Express Loaded...");
};
