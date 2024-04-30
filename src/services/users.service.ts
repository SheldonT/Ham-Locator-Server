/** @format */

import { UserData, userColumnNames } from "../models/user.model";

export default class UserService {
  public db: any;

  constructor(db: any) {
    this.db = db;
  }

  /*
    1. create method for getting userID from sessionID
    2. use this method in other methods to get userID from session.
    3. all methods will then take session ID as arguments instead of userID
  */

  fetchUserId(sessionID: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let uID: string = "-1";

      const sessionData = await this.db.pgConn.query(
        `SELECT sess FROM session WHERE sid='${sessionID}'`
      );

      if (sessionData.length === 0) {
        reject(
          `[server]: Error while fetching session data from database. Session Does not exist`
        );
      } else {
        uID = sessionData[0].sess.user;
      }

      resolve(uID);
    });
  }

  authUser(username: string, passwd: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const authUser = await this.db.pgConn.query(
        //`SELECT userId FROM users WHERE callsign='${username}' AND passwd=SHA2('${passwd}',512)`,
        `SELECT userid FROM users WHERE callsign='${username}' AND passwd=encode(digest('${passwd}', 'sha512'), 'hex')`
      );

      if (authUser.length !== 0) {
        resolve(authUser[0].userid);
      } else {
        resolve("-1");
      }
    });
  }

  sessionUser(sessionID: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      //this.fetchUserId(sessionID);

      const sid = await this.db.pgConn.query(
        `SELECT sess FROM session WHERE sid='${sessionID} '`
      );

      if (sid.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  getUser(id: any): Promise<UserData> {
    return new Promise(async (resolve, reject) => {
      let noPasswd: string[] = [];

      for (let i: number = 0; i < userColumnNames.length; i++) {
        if (userColumnNames[i] !== "passwd" && userColumnNames[i] !== "email") {
          if (userColumnNames[i] === "userId") {
            noPasswd.push("users.userId");
          } else {
            noPasswd.push(userColumnNames[i]);
          }
        }
      }

      const userInfo = await this.db.pgConn.query(
        `SELECT ${noPasswd} FROM users WHERE userId='${id}'`
      );

      if (userInfo.length === 0) {
        reject(
          `[server]: Error while fetching user info. User with id ${id} is not authenticated, or doesn't exist.`
        );
      } else {
        resolve(userInfo[0]);
      }
    });
  }

  addUser(newUser: UserData): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const exists = await this.db.pgConn.query(
        `SELECT * FROM users WHERE callsign='${newUser.call}' OR email='${newUser.email}'`
      );

      if (exists.length === 0) {
        await this.db.pgConn.query(
          `INSERT INTO users (${userColumnNames}) VALUES (uuid_generate_v4(),
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
          encode(digest('${newUser.password}', 'sha512'), 'hex'))`
        );
        //SHA2('${newUser.password}',512))`
        console.log(`[server]: User ${newUser.call} added`);
        resolve(`OK`);
      } else {
        reject(
          `[server]: User with username ${newUser.call} or email ${newUser.email} already exists`
        );
      }
    });
  }

  async editUser(newUser: UserData, id: string): Promise<string> {
    try {
      let includedUserInfo = `${
        newUser.call ? `callSign='${newUser.call}', ` : ``
      }${newUser.email ? `email='${newUser.email}', ` : ``}${
        newUser.country ? `country='${newUser.country}', ` : ``
      }${newUser.lat !== undefined ? `lat='${newUser.lat}', ` : ``}${
        newUser.lng !== undefined ? `lng='${newUser.lng}', ` : ``
      }${newUser.gridloc ? `gridloc='${newUser.gridloc}', ` : ``}${
        newUser.units ? `units='${newUser.units}', ` : ``
      }${newUser.itu !== undefined ? `itu='${newUser.itu}', ` : ``}${
        newUser.utc !== undefined ? `utc='${newUser.utc}', ` : ``
      }`;

      includedUserInfo = includedUserInfo.substring(
        0,
        includedUserInfo.length - 2
      );

      await this.db.pgConn.query(
        `UPDATE users
      SET
        ${includedUserInfo}
        WHERE userId='${id}'`
      );

      return new Promise((resolve, reject) => {
        console.log(`[server]: User with id ${id} successfuly updated.`);
        resolve("true");
      });
    } catch (e) {
      return new Promise((resolve, reject) => {
        console.log(
          `[server]: No record with userId ${id} in user database, or user is not authenticated. -> ${e}`
        );
        reject(`False`);
      });
    }
  }

  async logout(sID: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const findSess = await this.db.pgConn.query(
          `SELECT * FROM session WHERE sid='${sID}'`
        );

        if (findSess.length === 0) {
          resolve(false);
        } else {
          await this.db.pgConn.query(`DELETE FROM session WHERE sid='${sID}'`);

          resolve(true);
        }
      } catch (e) {
        reject(`[server]: An error occured while logging out -> ${e}`);
      }
    });
  }
}
