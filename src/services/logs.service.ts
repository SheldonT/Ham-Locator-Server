/** @format */

import { Record } from "../models/log.model";

export default class LogService {
  public db: any;

  constructor(db: any) {
    this.db = db;
  }

  getLog(id: number): Promise<Record[]> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM logs WHERE userId='${id}'`,
        (err: any, result: Record[]) => {
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

  getRecord(uid: number, rid: number): Promise<Record> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM logs WHERE recordId='${rid} AND userId='${uid}'`,
        (err: any, result: Record) => {
          //***************************** */
        }
      );
    });
  }

  //************************************************ */

  async aGetLog(id: string): Promise<Record> {
    let res: any;

    this.db.connection.query(
      `SELECT * FROM logs WHERE userId='${id}'`,
      (err: any, result: Record[]) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          res = result[0];
          console.log(res);
        }
      }
    );

    return res;
  }
  //************************************************ */
}
