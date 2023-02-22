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

      const record: Record = await this.service.getRecord(uid, rid);

      res.send(record);
    });

    this.routes.post("/addrecord", async (req: Request, res: Response) => {
      const newRecord = req.body;
      const newRecordConfirm = await this.service.addRecord(newRecord);

      res.send(newRecordConfirm);
    });

    this.routes.get("/editrecord", async (req: Request, res: Response) => {
      const edited = await this.service.editRecord(req.body);

      res.send(edited);
    });

    this.routes.get("/async", async (req: Request, res: Response) => {
      const id: any = req.query.id;

      res.send(await this.service.aGetLog(id));
    });
  }
}
