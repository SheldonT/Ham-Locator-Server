/** @format */

import { Request, Response, Router } from "express";
import LogService from "../services/logs.service";
import { Record } from "../models/log.model";

export default class LogsController {
  public routes = Router();
  public service;

  constructor(dbConn: any) {
    this.service = new LogService(dbConn);

    //TODO: Change this to post and get session ID from cookie.
    this.routes.get("/", async (req: Request, res: Response) => {
      const id: any = req.query.id;
      const decend: any = req.query.decend;

      const userId = await this.service
        .fetchUserId(id)
        .catch((e) => console.log(e));
      if (userId) {
        res.send(await this.service.getLog(userId, decend));
      } else {
        res.send("Fetching Log Failed");
      }
    });

    this.routes.get("/getrecord", async (req: Request, res: Response) => {
      const id: any = req.query.uid; //this is actually the session id
      const rid: any = req.query.rid;

      const userId = await this.service
        .fetchUserId(id)
        .catch((e) => console.log(e));

      if (userId) {
        const record: Record = await this.service.getRecord(userId, rid);

        res.send(record);
      } else {
        res.send("Fetching Record Failed");
      }
    });

    this.routes.post("/addrecord", async (req: Request, res: Response) => {
      const newRecord = req.body;

      const userId = await this.service
        .fetchUserId(newRecord.userId)
        .catch((e) => console.log(e));

      if (userId) {
        const newRecordConfirm = await this.service
          .addRecord(newRecord, userId)
          .catch((e) => console.log(e));

        res.send(newRecordConfirm);
      } else {
        res.send("Add Record Failed");
      }
    });

    this.routes.post("/editrecord", async (req: Request, res: Response) => {
      const uid: string = req.body.userId;
      const record: Record = req.body;

      const userId = await this.service
        .fetchUserId(uid)
        .catch((e) => console.log(e));

      if (userId) {
        const edited = await this.service
          .editRecord(record, userId)
          .catch((e) => console.log(console.log(e)));

        res.send(edited);
      } else {
        res.send("Editing Record Failed");
      }
    });

    this.routes.post("/deleterecord", async (req: Request, res: Response) => {
      const uid: any = req.body.userId;
      const recordId: any = req.body.recordId;

      const userId = await this.service
        .fetchUserId(uid)
        .catch((e) => console.log(e));

      if (userId) {
        const deleted = await this.service
          .deleteRecord(userId, recordId)
          .catch((e) => console.log(console.log(e)));

        res.send(deleted);
      } else {
        res.send("Delete Record Failed");
      }
    });

    /*this.routes.get("/async", async (req: Request, res: Response) => {
      const id: any = req.query.id;

      //result from db query is passed as a parameter to the callback function,
      //and sent to client.
      await this.service.aGetLog(id, (result: any) => {
        res.send(result);
      });
    });*/
  }
}
