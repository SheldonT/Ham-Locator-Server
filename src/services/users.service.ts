/** @format */

import { User, userColumnNames } from "../models/user.model";

export default class UserService {
  public db: any;

  constructor(db: any) {
    this.db = db;
  }

  authUser(username: string, passwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT userId FROM users WHERE callsign='${username}' AND passwd=SHA2('${passwd}',512)`,
        (err: any, results: string[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (results.length !== 0) {
              this.db.connection.query(
                `DELETE FROM authusers WHERE userId = '${Object.values(
                  results[0]
                )}'`
              );
              this.db.connection.query(
                `INSERT INTO authusers (userId) VALUES ('${Object.values(
                  results[0]
                )}') `
              );
            } else {
              console.log("User doesn't exist");
              resolve("-1");
            }
            resolve(results[0]);
          }
        }
      );
    });
  }

  getUser(id: any): Promise<User> {
    return new Promise((resolve, reject) => {
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

      this.db.connection.query(
        `SELECT ${noPasswd} FROM users INNER JOIN authusers ON users.userId='${id}' AND authusers.userId='${id}'`,
        (err: any, results: User[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (results.length === 0) {
              reject(
                `[server]: User with id ${id} is not authenticated, or doesn't exist`
              );
            } else {
              resolve(results[0]);
            }
          }
        }
      );
    });
  }

  addUser(newUser: User): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM users WHERE callsign='${newUser.call}' OR email='${newUser.email}'`,
        (err: any, results: User[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (results.length === 0) {
              this.db.connection
                .query(`INSERT INTO users (${userColumnNames}) VALUES (UUID(), 
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

              console.log(`User ${newUser.call} added`);
              resolve(`User ${newUser.call} added`);
            } else {
              console.log(`User ${newUser.call} already exists`);
              resolve(`User ${newUser.call} already exists`);
            }
          }
        }
      );
    });
  }

  editUser(newUser: User, id: number): Promise<User> {
    let includedUserInfo = `${
      newUser.call ? `users.callSign='${newUser.call}', ` : ``
    }${newUser.email ? `users.email='${newUser.email}', ` : ``}${
      newUser.country ? `users.country='${newUser.country}', ` : ``
    }${newUser.lat !== undefined ? `users.lat='${newUser.lat}', ` : ``}${
      newUser.lng !== undefined ? `users.lng='${newUser.lng}', ` : ``
    }${newUser.gridloc ? `users.gridloc='${newUser.gridloc}', ` : ``}${
      newUser.units ? `users.units='${newUser.units}', ` : ``
    }${newUser.itu !== undefined ? `users.itu='${newUser.itu}', ` : ``}${
      newUser.utc !== undefined ? `users.utc='${newUser.utc}', ` : ``
    }`;

    includedUserInfo = includedUserInfo.substring(
      0,
      includedUserInfo.length - 2
    );

    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `UPDATE users, authusers
        SET
          ${includedUserInfo}
          WHERE users.userId='${id}' AND authusers.userId='${id}' `,
        (err: any, result: any) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (result.affectedRows !== 0) {
              console.log(`[server]: User with id ${id} successfuly updated.`);
              resolve(result);
            } else {
              reject(`[server]: No record with userId ${id}.`);
            }
          }
        }
      );
    });
  }
}
