/** @format */

import { Request, Response, Router } from "express";
import UsersController from "./users.controller";
import LogsController from "./logs.controller";

export const Routes = (dbConn: any): Router => {
  const router = Router();

  router.use("/users", new UsersController(dbConn).routes);

  router.use("/logs", new LogsController(dbConn).routes);

  router.get("/", (req: Request, res: Response) => {
    res.send("Base Route Found");
  });

  return router;
};
