/** @format */

import { Record } from "../models/log.model";

export default class LogService {
  public db: any;
  private logColumnDescription: string[] = [
    "userId",
    "username",
    "userCall",
    "freq",
    "mode",
    "sigRepSent",
    "sigRepRecv",
    "name",
    "grid",
    "serialSent",
    "serialRecv",
    "comment",
    "lat",
    "lng",
    "country",
    "details",
    "contactDate",
    "contactTime",
    "utc",
  ];

  constructor(db: any) {
    this.db = db;
  }

  getLog(id: number): Promise<Record[]> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM logs WHERE userId='${id}'`,
        (err: any, result: Record[]) => {
          if (err) {
            //console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  getRecord(uid: number, rid: number): Promise<Record> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM logs WHERE recordId='${rid}' AND userId='${uid}'`,
        (err: any, result: Record) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  addRecord(newRecord: Record): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `INSERT INTO logs (${this.logColumnDescription}) VALUES ('${newRecord.userId}', '${newRecord.username}', '${newRecord.userCall}', '${newRecord.freq}', '${newRecord.mode}', '${newRecord.sigRepSent}', '${newRecord.sigRepRecv}', '${newRecord.name}', '${newRecord.grid}', '${newRecord.serialSent}', '${newRecord.serialRecv}', '${newRecord.comment}', '${newRecord.lat}', '${newRecord.lng}', '${newRecord.country}', '${newRecord.details}', '${newRecord.date}', '${newRecord.time}', '${newRecord.utc}')`,
        (err: any, result: any) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (result) {
              console.log(result);
              resolve(result);
            } else {
              console.log("No record added.");
              resolve(result);
            }
          }
        }
      );
    });
  }

  editRecord(newRecord: Record): Promise<Record> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `REPLACE INTO logs (
          recordId, ${this.logColumnDescription}
          ) VALUES (
            '${newRecord.recordId}', 
            '${newRecord.userId}', 
            '${newRecord.username}', 
            '${newRecord.userCall}', 
            '${newRecord.freq}', 
            '${newRecord.mode}', 
            '${newRecord.sigRepSent}', 
            '${newRecord.sigRepRecv}', 
            '${newRecord.name}', 
            '${newRecord.grid}', 
            '${newRecord.serialSent}', 
            '${newRecord.serialRecv}', 
            '${newRecord.comment}', 
            '${newRecord.lat}', 
            '${newRecord.lng}', 
            '${newRecord.country}', 
            '${newRecord.details}', 
            '${newRecord.date}', 
            '${newRecord.time}', 
            '${newRecord.utc}'
          )`,
        (err: any, result: Record) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  //************************************************ */

  async aGetLog(id: string): Promise<Record[]> {
    let res: Record[] = [];

    const response = this.db.connection.query(
      `SELECT * FROM logs WHERE userId='${id}'`,
      (err: any, result: Record[]) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          res = result;
          console.log(res);
        }
      }
    );

    console.log(response);
    return response;
  }
  //************************************************ */
}
