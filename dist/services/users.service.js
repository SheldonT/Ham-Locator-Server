"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class UserService {
    constructor(db) {
        this.db = db;
    }
    /*
      1. create method for getting userID from sessionID
      2. use this method in other methods to get userID from session.
      3. all methods will then take session ID as arguments instead of userID
    */
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
    authUser(username, passwd) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`SELECT userId FROM users WHERE callsign='${username}' AND passwd=SHA2('${passwd}',512)`, (err, results) => {
                if (err) {
                    reject(`[server]: Error while authenticating user => ${err}`);
                }
                else {
                    if (results.length > 0) {
                        resolve(results[0].userId);
                    }
                    else {
                        resolve("-1");
                    }
                }
            });
        });
    }
    sessionUser(sessionID) {
        return new Promise((resolve, reject) => {
            //this.fetchUserId(sessionID);
            this.db.connection.query(`SELECT data FROM sessions WHERE session_id='${sessionID} '`, (err, result) => {
                if (err) {
                    reject(`[server]: Error while getting session data => ${err}`);
                }
                else {
                    if (result[0]) {
                        //if (result[0].data) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            });
        });
    }
    getUser(id) {
        return new Promise((resolve, reject) => {
            let noPasswd = [];
            for (let i = 0; i < user_model_1.userColumnNames.length; i++) {
                if (user_model_1.userColumnNames[i] !== "passwd" && user_model_1.userColumnNames[i] !== "email") {
                    if (user_model_1.userColumnNames[i] === "userId") {
                        noPasswd.push("users.userId");
                    }
                    else {
                        noPasswd.push(user_model_1.userColumnNames[i]);
                    }
                }
            }
            this.db.connection.query(`SELECT ${noPasswd} FROM users WHERE userId='${id}'`, (err, results) => {
                if (err || !results[0]) {
                    reject(`[server]: Error while fetching user info. User with id ${id} is not authenticated, or doesn't exist => ${err}`);
                }
                else {
                    resolve(results[0]);
                }
            });
        });
    }
    addUser(newUser) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`SELECT * FROM users WHERE callsign='${newUser.call}' OR email='${newUser.email}'`, (err, results) => {
                if (err) {
                    reject(`[server]: Error while adding new user => ${err}`);
                }
                else {
                    if (results.length === 0) {
                        this.db.connection
                            .query(`INSERT INTO users (${user_model_1.userColumnNames}) VALUES (UUID(), 
                  '${newUser.call}',
                  '${newUser.email}',
                  '${newUser.country}',
                  '${newUser.lat}',
                  '${newUser.lng}',
                  '${newUser.gridloc}',
                  '${newUser.privilege}',
                  '${newUser.units}',
                  '${newUser.itu}',
                  '${newUser.utc}',
                  SHA2('${newUser.password}',512))`);
                        console.log(`[server]: User ${newUser.call} added`);
                        resolve(`OK`);
                    }
                    else {
                        reject(`[server]: User with username ${newUser.call} or email ${newUser.email} already exists`);
                    }
                }
            });
        });
    }
    editUser(newUser, id) {
        let includedUserInfo = `${newUser.call ? `users.callSign='${newUser.call}', ` : ``}${newUser.email ? `users.email='${newUser.email}', ` : ``}${newUser.country ? `users.country='${newUser.country}', ` : ``}${newUser.lat !== undefined ? `users.lat='${newUser.lat}', ` : ``}${newUser.lng !== undefined ? `users.lng='${newUser.lng}', ` : ``}${newUser.gridloc ? `users.gridloc='${newUser.gridloc}', ` : ``}${newUser.units ? `users.units='${newUser.units}', ` : ``}${newUser.itu !== undefined ? `users.itu='${newUser.itu}', ` : ``}${newUser.utc !== undefined ? `users.utc='${newUser.utc}', ` : ``}`;
        includedUserInfo = includedUserInfo.substring(0, includedUserInfo.length - 2);
        return new Promise((resolve, reject) => {
            this.db.connection.query(`UPDATE users
        SET
          ${includedUserInfo}
          WHERE users.userId='${id}'`, (err, result) => {
                if (err) {
                    reject(`[Server}: Error while updating user informaiton => ${err}`);
                }
                else {
                    if (result.affectedRows !== 0) {
                        console.log(`[server]: User with id ${id} successfuly updated.`);
                        resolve(result);
                    }
                    else {
                        reject(`[server]: No record with userId ${id} in user database, or user is not authenticated.`);
                    }
                }
            });
        });
    }
    logout(sID) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`DELETE sessions.* FROM sessions WHERE session_id='${sID}'`, (err, result) => {
                if (err) {
                    reject(`[server]: Error while logging out => ${err}`);
                }
                else {
                    if (result.affectedRows) {
                        console.log(`[server]: User session ${sID} deleted`);
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
exports.default = UserService;
