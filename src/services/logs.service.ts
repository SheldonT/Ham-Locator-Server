/** @format */

import { Record, logColumnNames } from "../models/log.model";
import { escape } from "mysql2";

export default class LogService {
  public db: any;

  constructor(db: any) {
    this.db = db;
  }

  fetchUserId(sessionID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let uID: string = "-1";

      this.db.connection.query(
        `SELECT data FROM sessions WHERE session_id='${sessionID}'`,
        (err: any, results: any) => {
          if (err) {
            reject(
              `[server]: Error while fetching session data from database => ${err}`
            );
          } else {
            if (results[0]) uID = JSON.parse(results[0].data).user;
          }
          resolve(uID);
        }
      );
    });
  }

  getLog(id: string, decend: string): Promise<Record[]> {
    return new Promise((resolve, reject) => {
      let query: string = `SELECT * FROM logs WHERE userId='${id}'`;

      if (decend === "true") {
        query = `SELECT * FROM logs WHERE userId='${id}' ORDER BY contactTime DESC`;
      }

      this.db.connection.query(query, (err: any, result: Record[]) => {
        if (err) {
          reject(`[server] Error while getting log for user ${id} => ${err}`);
        } else {
          resolve(result);
        }
      });
    });
  }

  getRecord(uid: number, rid: number): Promise<Record> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM logs WHERE recordId='${rid}' AND userId='${uid}'`,
        (err: any, result: Record) => {
          if (err) {
            reject(
              `[server]: Error while getting record ${rid} from user ${uid} => ${err}`
            );
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  addRecord(newRecord: Record, uid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `INSERT INTO logs (${logColumnNames}) VALUES (UUID(), '${uid}', '${
          newRecord.contactCall
        }', '${newRecord.freq}', '${newRecord.mode}', '${
          newRecord.sigRepSent
        }', '${newRecord.sigRepRecv}', '${newRecord.name}', '${
          newRecord.grid
        }', '${newRecord.serialSent}', '${newRecord.serialRecv}', ${escape(
          newRecord.comment
        )}, '${newRecord.lat}', '${newRecord.lng}', '${
          newRecord.country
        }', ${escape(newRecord.details)}, '${newRecord.contactDate}', '${
          newRecord.contactTime
        }', '${newRecord.utc}')`,
        (err: any, result: any) => {
          if (err) {
            reject(
              `[server]: Error while adding record for user ${uid} => ${err}`
            );
          } else {
            if (result.affectedRows) {
              resolve(result);
            } else {
              reject(
                `[server]: No record added. MySQL server response: ${result}`
              );
            }
          }
        }
      );
    });
  }

  editRecord(newRecord: Record, id: number): Promise<Record> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `UPDATE logs
        SET
            logs.contactCall='${newRecord.contactCall}', 
            logs.freq='${newRecord.freq}', 
            logs.mode='${newRecord.mode}', 
            logs.sigRepSent='${newRecord.sigRepSent}', 
            logs.sigRepRecv='${newRecord.sigRepRecv}', 
            logs.name='${newRecord.name}', 
            logs.grid='${newRecord.grid}', 
            logs.serialSent='${newRecord.serialSent}', 
            logs.serialRecv='${newRecord.serialRecv}', 
            logs.comment=${escape(newRecord.comment)}, 
            logs.lat='${newRecord.lat}', 
            logs.lng='${newRecord.lng}', 
            logs.country='${newRecord.country}', 
            logs.details=${escape(newRecord.details)}, 
            logs.contactDate='${newRecord.contactDate}', 
            logs.contactTime='${newRecord.contactTime}', 
            logs.utc='${newRecord.utc}'
          WHERE userId='${id}' AND recordId='${newRecord.recordId}'`,
        (err: any, result: any) => {
          if (err) {
            reject(
              `[server]: Error while editing record for user ${id} => ${err}`
            );
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

  // delete logs.* from logs inner join authusers on authusers.userId=authusers.userId where recordId='786bb1fb-c581-11ed-82ae-346f24ea4a5a';

  deleteRecord(uid: string, recordId: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.db.connection.query(
        `DELETE logs.* FROM logs WHERE recordId='${recordId}' AND userId='${uid}'`,
        (err: any, result: any) => {
          if (err) {
            reject(
              `[server]: Error while deleting record ${recordId} for user ${uid} => ${err}`
            );
          } else {
            if (result.affectedRows === 0) {
              reject(
                `[server]: Error while deleting record ${recordId} for user ${uid} => ${err}`
              );
            } else {
              resolve(result);
            }
          }
        }
      );
    });
  }

  //************************************************ */

  //async function returning a value with type any

  async aGetLog(id: string, callBack: Function): Promise<any> {
    //let r: Record[] = [];
    this.db.connection.query(
      `SELECT * FROM logs WHERE userId='${id}'`,

      (err: any, result: Record[]) => {
        if (err) {
          console.log(err);
          return err;
        }
        return callBack(result);
        // r = result;
      }
    );
    //return r;

    //************************************************ */
  }
}
