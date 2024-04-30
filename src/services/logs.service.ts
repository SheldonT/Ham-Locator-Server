/** @format */
import { as } from "pg-promise";
import { Record, logColumnNames } from "../models/log.model";

export default class LogService {
  public db: any;

  constructor(db: any) {
    this.db = db;
  }

  fetchUserId(sessionID: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let uID: string = "-1";

      const session = await this.db.pgConn.query(
        `SELECT sess FROM session WHERE sid='${sessionID}'`
      );

      if (session.length !== 0) {
        uID = session[0].sess.user;
      } else {
        reject(
          `[server]: Error while fetching session data from database. Session with ${sessionID} probably doesn't exist.`
        );
      }

      resolve(uID);
    });
  }

  getLog(id: string, decend: string): Promise<Record[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let query: string = `SELECT * FROM logs WHERE userId='${id}'`;

        if (decend === "true") {
          query = `SELECT * FROM logs WHERE userId='${id}' ORDER BY contactTime DESC`;
        }

        const logs = await this.db.pgConn.query(query);

        console.log(`[server] Fetched logs for user ${id}.`);
        resolve(logs);
      } catch (e) {
        reject(`[server] Error while getting log for user ${id} -> ${e}`);
      }
    });
  }

  getRecord(uid: number, rid: number): Promise<Record> {
    return new Promise(async (resolve, reject) => {
      const record = await this.db.pgConn.query(
        `SELECT * FROM logs WHERE recordId='${rid}' AND userId='${uid}'`
      );

      if (record.length !== 0) {
        resolve(record[0]);
      } else {
        reject(
          `[server]: Error while getting record ${rid} from user ${uid}. The record probably doesn't exist.`
        );
      }
    });
  }

  addRecord(newRecord: Record, uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const insertLog = await this.db.pgConn.query(
          `INSERT INTO logs (${logColumnNames}) VALUES (uuid_generate_v4(), '${uid}', '${
            newRecord.contactCall
          }', '${newRecord.freq}', '${newRecord.mode}', '${
            newRecord.sigRepSent
          }', '${newRecord.sigRepRecv}', '${newRecord.name}', '${
            newRecord.grid
          }', '${newRecord.serialSent}', '${newRecord.serialRecv}', ${as.text(
            newRecord.comment
          )}, '${newRecord.lat}', '${newRecord.lng}', '${
            newRecord.country
          }', ${as.text(newRecord.details)}, '${newRecord.contactDate}', '${
            newRecord.contactTime
          }', '${newRecord.utc}')`
        );

        resolve(insertLog);
      } catch (e) {
        reject(`[server]: Error while adding record for user ${uid} => ${e}`);
      }
    });
  }

  editRecord(newRecord: Record, id: number): Promise<Record> {
    return new Promise(async (resolve, reject) => {
      try {
        const updateLog = await this.db.pgConn.query(
          `UPDATE logs
        SET
            contactCall='${newRecord.contactCall}', 
            freq='${newRecord.freq}', 
            mode='${newRecord.mode}', 
            sigRepSent='${newRecord.sigRepSent}', 
            sigRepRecv='${newRecord.sigRepRecv}', 
            name='${newRecord.name}', 
            grid='${newRecord.grid}', 
            serialSent='${newRecord.serialSent}', 
            serialRecv='${newRecord.serialRecv}', 
            comment=${as.text(newRecord.comment)}, 
            lat='${newRecord.lat}', 
            lng='${newRecord.lng}', 
            country='${newRecord.country}', 
            details=${as.text(newRecord.details)}, 
            contactDate='${newRecord.contactDate}', 
            contactTime='${newRecord.contactTime}', 
            utc='${newRecord.utc}'
          WHERE userId='${id}' AND recordId='${newRecord.recordId}'`
        );

        resolve(updateLog);
      } catch (e) {
        reject(`[server]: Error while editing record for user ${id} -> ${e}`);
      }
    });
  }

  // delete logs.* from logs inner join authusers on authusers.userId=authusers.userId where recordId='786bb1fb-c581-11ed-82ae-346f24ea4a5a';

  deleteRecord(uid: string, recordId: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      try {
        const delRec = this.db.pgConn.query(
          `DELETE FROM logs WHERE recordId='${recordId}' AND userId='${uid}'`
        );

        resolve(delRec);
      } catch (e) {
        reject(
          `[server]: Error while deleting record ${recordId} for user ${uid} -> ${e}`
        );
      }
    });
  }

  /************************************************

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
  }
  ************************************************ */
}
