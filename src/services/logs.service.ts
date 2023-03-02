/** @format */

import { Record, logColumnNames } from "../models/log.model";

export default class LogService {
  public db: any;

  constructor(db: any) {
    this.db = db;
  }

  getLog(id: number): Promise<Record[]> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM logs INNER JOIN authusers ON logs.userId='${id}' AND authusers.userId='${id}'`,
        (err: any, result: Record[]) => {
          if (err) {
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
        `SELECT * FROM logs INNER JOIN authusers ON logs.recordId='${rid}' AND logs.userId='${uid}' AND authusers.userId='${uid}'`,
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

  addRecord(newRecord: Record, uid: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM authusers WHERE userId='${uid}'`,
        (err: any, result: any) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          if (result.length === 0) {
            reject(`[server]: User with id ${uid} is not Authenticated`);
            return;
          }
          if (result[0].userId === uid) {
            this.db.connection.query(
              `INSERT INTO logs (${logColumnNames}) VALUES ('${newRecord.userId}', '${newRecord.contactCall}', '${newRecord.freq}', '${newRecord.mode}', '${newRecord.sigRepSent}', '${newRecord.sigRepRecv}', '${newRecord.name}', '${newRecord.grid}', '${newRecord.serialSent}', '${newRecord.serialRecv}', '${newRecord.comment}', '${newRecord.lat}', '${newRecord.lng}', '${newRecord.country}', '${newRecord.details}', '${newRecord.contactDate}', '${newRecord.contactTime}', '${newRecord.utc}')`,
              (err: any, result: any) => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  if (result.affectedRows) {
                    console.log(result);
                    resolve(result);
                  } else {
                    reject(
                      `[server]: No record added. MySQL server response: ${result}`
                    );
                  }
                }
              }
            );
          }
        }
      );
    });
  }

  editRecord(newRecord: Record, id: number): Promise<Record> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `UPDATE logs, authusers
        SET
            logs.userId='${newRecord.userId}',  
            logs.contactCall='${newRecord.contactCall}', 
            logs.freq='${newRecord.freq}', 
            logs.mode='${newRecord.mode}', 
            logs.sigRepSent='${newRecord.sigRepSent}', 
            logs.sigRepRecv='${newRecord.sigRepRecv}', 
            logs.name='${newRecord.name}', 
            logs.grid='${newRecord.grid}', 
            logs.serialSent='${newRecord.serialSent}', 
            logs.serialRecv='${newRecord.serialRecv}', 
            logs.comment='${newRecord.comment}', 
            logs.lat='${newRecord.lat}', 
            logs.lng='${newRecord.lng}', 
            logs.country='${newRecord.country}', 
            logs.details='${newRecord.details}', 
            logs.contactDate='${newRecord.contactDate}', 
            logs.contactTime='${newRecord.contactTime}', 
            logs.utc='${newRecord.utc}'
          WHERE logs.userId='${id}' AND authusers.userId='${id}' AND logs.recordId=${newRecord.recordId}`,
        (err: any, result: any) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (result.affectedRows === 0) {
              reject(
                `[server]: Owner of recordId ${newRecord.recordId} is not authenticated, or the record doesn't exist.`
              );
            } else {
              resolve(result);
            }
          }
        }
      );
    });
  }

  //deleteRecord (uid: number, recordId: number): Promise<any> {
  // new Promise((resolve: any, reject: any) =>{});
  // }

  //************************************************ */

  //async function returning a value with type any

  async aGetLog(id: string, callBack: Function): Promise<any> {
    this.db.connection.query(
      `SELECT * FROM logs WHERE userId='${id}'`,

      (err: any, result: Record[]) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log("In Callback");
        return callBack(result);
      }
    );
    console.log("Outside callback");
    //return resp;

    //************************************************ */
  }
}
