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
      const decend: any = req.query.decend;

      res.send(await this.service.getLog(id, decend));
    });

    this.routes.get("/getrecord", async (req: Request, res: Response) => {
      const uid: any = req.query.uid;
      const rid: any = req.query.rid;

      const record: Record = await this.service.getRecord(uid, rid);

      res.send(record);
    });

    this.routes.post("/addrecord", async (req: Request, res: Response) => {
      const newRecord = req.body;

      const newRecordConfirm = await this.service
        .addRecord(newRecord, newRecord.userId)
        .catch((e) => console.log(e));

      res.send(newRecordConfirm);
    });

    this.routes.post("/editrecord", async (req: Request, res: Response) => {
      const uid: number = req.body.userId;
      const record: Record = req.body;

      const edited = await this.service
        .editRecord(record, uid)
        .catch((e) => console.log(e));

      res.send(edited);
    });

    this.routes.post("/deleterecord", async (req: Request, res: Response) => {
      const uid: any = req.body.userId;
      const recordId: any = req.body.recordId;

      const deleted = await this.service
        .deleteRecord(uid, recordId)
        .catch((e) => console.log(e));

      res.send(deleted);
    });

    this.routes.get("/async", async (req: Request, res: Response) => {
      const id: any = req.query.id;

      //result from db query is passed as a parameter to the callback function,
      //and sent to client.
      await this.service.aGetLog(id, (result: any) => {
        res.send(result);
      });
    });
  }
}
