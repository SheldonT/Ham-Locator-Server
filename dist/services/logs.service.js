"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_model_1 = require("../models/log.model");
const mysql2_1 = require("mysql2");
class LogService {
    constructor(db) {
        this.db = db;
    }
    fetchUserId(sessionID) {
        return new Promise((resolve, reject) => {
            let uID = "-1";
            this.db.connection.query(`SELECT data FROM sessions WHERE session_id='${sessionID}'`, (err, results) => {
                if (err) {
                    reject(`[server]: Error while fetching session data from database => ${err}`);
                }
                else {
                    if (results[0])
                        uID = JSON.parse(results[0].data).user;
                }
                resolve(uID);
            });
        });
    }
    getLog(id, decend) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM logs WHERE userId='${id}'`;
            if (decend === "true") {
                query = `SELECT * FROM logs WHERE userId='${id}' ORDER BY contactTime DESC`;
            }
            this.db.connection.query(query, (err, result) => {
                if (err) {
                    reject(`[server] Error while getting log for user ${id} => ${err}`);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    getRecord(uid, rid) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`SELECT * FROM logs WHERE recordId='${rid}' AND userId='${uid}'`, (err, result) => {
                if (err) {
                    reject(`[server]: Error while getting record ${rid} from user ${uid} => ${err}`);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    addRecord(newRecord, uid) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`INSERT INTO logs (${log_model_1.logColumnNames}) VALUES (UUID(), '${uid}', '${newRecord.contactCall}', '${newRecord.freq}', '${newRecord.mode}', '${newRecord.sigRepSent}', '${newRecord.sigRepRecv}', '${newRecord.name}', '${newRecord.grid}', '${newRecord.serialSent}', '${newRecord.serialRecv}', ${(0, mysql2_1.escape)(newRecord.comment)}, '${newRecord.lat}', '${newRecord.lng}', '${newRecord.country}', ${(0, mysql2_1.escape)(newRecord.details)}, '${newRecord.contactDate}', '${newRecord.contactTime}', '${newRecord.utc}')`, (err, result) => {
                if (err) {
                    reject(`[server]: Error while adding record for user ${uid} => ${err}`);
                }
                else {
                    if (result.affectedRows) {
                        resolve(result);
                    }
                    else {
                        reject(`[server]: No record added. MySQL server response: ${result}`);
                    }
                }
            });
        });
    }
    editRecord(newRecord, id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`UPDATE logs
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
            logs.comment=${(0, mysql2_1.escape)(newRecord.comment)}, 
            logs.lat='${newRecord.lat}', 
            logs.lng='${newRecord.lng}', 
            logs.country='${newRecord.country}', 
            logs.details=${(0, mysql2_1.escape)(newRecord.details)}, 
            logs.contactDate='${newRecord.contactDate}', 
            logs.contactTime='${newRecord.contactTime}', 
            logs.utc='${newRecord.utc}'
          WHERE userId='${id}' AND recordId='${newRecord.recordId}'`, (err, result) => {
                if (err) {
                    reject(`[server]: Error while editing record for user ${id} => ${err}`);
                }
                else {
                    if (result.affectedRows === 0) {
                        reject(`[server]: Owner of recordId ${newRecord.recordId} is not authenticated, or the record doesn't exist.`);
                    }
                    else {
                        resolve(result);
                    }
                }
            });
        });
    }
    // delete logs.* from logs inner join authusers on authusers.userId=authusers.userId where recordId='786bb1fb-c581-11ed-82ae-346f24ea4a5a';
    deleteRecord(uid, recordId) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`DELETE logs.* FROM logs WHERE recordId='${recordId}' AND userId='${uid}'`, (err, result) => {
                if (err) {
                    reject(`[server]: Error while deleting record ${recordId} for user ${uid} => ${err}`);
                }
                else {
                    if (result.affectedRows === 0) {
                        reject(`[server]: Error while deleting record ${recordId} for user ${uid} => ${err}`);
                    }
                    else {
                        resolve(result);
                    }
                }
            });
        });
    }
    //************************************************ */
    //async function returning a value with type any
    aGetLog(id, callBack) {
        return __awaiter(this, void 0, void 0, function* () {
            //let r: Record[] = [];
            this.db.connection.query(`SELECT * FROM logs WHERE userId='${id}'`, (err, result) => {
                if (err) {
                    console.log(err);
                    return err;
                }
                return callBack(result);
                // r = result;
            });
            //return r;
            //************************************************ */
        });
    }
}
exports.default = LogService;
