/** @format */

import { Request, Response, Router } from "express";
import LogService from "../services/logs.service";
import { Record } from "../models/log.model";

export default class LogsController {
  public routes = Router();
  public service;

  constructor(dbConn: any) {
    this.service = new LogService(dbConn);

    this.routes.get("/", async (req: Request, res: Response) => {
      const id: any = req.query.id;

      res.send(await this.service.getLog(id));
    });

    this.routes.get("/getrecord", async (req: Request, res: Response) => {
      const uid: any = req.query.uid;
      const rid: any = req.query.rid;

      res.send(await this.service.getRecord(uid, rid));
    });

    this.routes.get("/async", async (req: Request, res: Response) => {
      const id: any = req.query.id;

      res.send(await this.service.aGetLog(id));
    });
  }
}
