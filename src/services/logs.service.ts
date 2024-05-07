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
        let query: string = `SELECT * FROM logs WHERE user_id='${id}'`;

        if (decend === "true") {
          query = `SELECT * FROM logs WHERE user_id='${id}' ORDER BY contact_time DESC`;
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
        `SELECT * FROM logs WHERE record_id='${rid}' AND user_id='${uid}'`
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
            newRecord.contact_call
          }', '${newRecord.freq}', '${newRecord.mode}', '${
            newRecord.sig_rep_sent
          }', '${newRecord.sig_rep_recv}', '${newRecord.name}', '${
            newRecord.grid
          }', '${newRecord.serial_sent}', '${newRecord.serial_recv}', ${as.text(
            newRecord.comment
          )}, '${newRecord.lat}', '${newRecord.lng}', '${
            newRecord.country
          }', ${as.text(newRecord.details)}, '${newRecord.contact_date}', '${
            newRecord.contact_time
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
            contact_call='${newRecord.contact_call}', 
            freq='${newRecord.freq}', 
            mode='${newRecord.mode}', 
            sig_rep_sent='${newRecord.sig_rep_sent}', 
            sig_rep_recv='${newRecord.sig_rep_recv}', 
            name='${newRecord.name}', 
            grid='${newRecord.grid}', 
            serial_sent='${newRecord.serial_sent}', 
            serial_recv='${newRecord.serial_recv}', 
            comment=${as.text(newRecord.comment)}, 
            lat='${newRecord.lat}', 
            lng='${newRecord.lng}', 
            country='${newRecord.country}', 
            details=${as.text(newRecord.details)}, 
            contact_date='${newRecord.contact_date}', 
            contact_time='${newRecord.contact_time}', 
            utc='${newRecord.utc}'
          WHERE user_id='${id}' AND record_id='${newRecord.record_id}'`
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
          `DELETE FROM logs WHERE record_id='${recordId}' AND user_id='${uid}'`
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
