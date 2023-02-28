/** @format */

import { Record, logColumnNames } from "../models/log.model";

export default class LogService {
  public db: any;

  constructor(db: any) {
    this.db = db;
  }

  getLog(id: number): Promise<Record[]> {
    return new Promise((resolve, reject) => {
      let authCheck: any;

      this.db.connection.query(
        `SELECT * FROM authusers WHERE userId='${id}'`,
        (err: any, result: any) => {
          authCheck = result;
        }
      );

      console.log(authCheck);
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
        `INSERT INTO logs (${logColumnNames}) VALUES ('${newRecord.userId}', '${newRecord.contactCall}', '${newRecord.freq}', '${newRecord.mode}', '${newRecord.sigRepSent}', '${newRecord.sigRepRecv}', '${newRecord.name}', '${newRecord.grid}', '${newRecord.serialSent}', '${newRecord.serialRecv}', '${newRecord.comment}', '${newRecord.lat}', '${newRecord.lng}', '${newRecord.country}', '${newRecord.details}', '${newRecord.contactDate}', '${newRecord.contactTime}', '${newRecord.utc}')`,
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
          recordId, ${logColumnNames}
          ) VALUES (
            '${newRecord.recordId}', 
            '${newRecord.userId}',  
            '${newRecord.contactCall}', 
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
            '${newRecord.contactDate}', 
            '${newRecord.contactTime}', 
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

  //async function returning a value with type any

  async aGetLog(id: string, callBack: Function): Promise<any> {
    //assign the return value of the query to resp. This value is not actually used, see comment by return statement.
    const resp = this.db.connection.query(
      `SELECT * FROM logs WHERE userId='${id}'`,

      //result parameter in the query callback function has the type Record
      (err: any, result: Record[]) => {
        if (err) {
          console.log(err);
          return err;
        }
        //result: Record[] is now passed as the parameter to callBack(), which is a callback function
        //passed as a parameter to aGetLog (phew...). The value of result is now available when calling
        //aGetLog in logs.controller.ts.
        return callBack(result);
      }
    );

    //Cound not return resp, because db.connection.query isn't a promise. I kept getting this error:
    //Error: You have tried to call .then(), .catch(), or invoked await on the result of query that is
    //not a promise, which is a programming error.
    //I'm not sure if this is actually an async function without returning a value.

    //return resp;

    //************************************************ */
  }
}
