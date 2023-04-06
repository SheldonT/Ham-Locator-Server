/** @format */

import { Request, Response, Router } from "express";
import UsersController from "../controllers/users.controller";
import LogsController from "./logs.controller";

export const Routes = (dbConn: any): Router => {
  const router = Router();
  const userController = new UsersController(dbConn);
  const logController = new LogsController(dbConn);

  router.use("/users", userController.routes);

  router.use("/logs", logController.routes);

  router.get("/", (req: Request, res: Response) => {
    console.log("base route");
  });

  return router;
};
