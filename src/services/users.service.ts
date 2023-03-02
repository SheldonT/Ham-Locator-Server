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
        `SELECT userId FROM users WHERE callsign='${username}' and passwd='${passwd}'`,
        (err: any, results: string[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (results.length !== 0) {
              console.log(results);
              this.db.connection.query(
                `DELETE FROM authusers WHERE userId = ${Object.values(
                  results[0]
                )}`
              );
              this.db.connection.query(
                `INSERT INTO authusers (userId) VALUES (${Object.values(
                  results[0]
                )}) `
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

  getUser(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM users INNER JOIN authusers ON users.userId='${id}' AND authusers.userId='${id}'`,
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
                .query(`INSERT INTO users (${userColumnNames}) VALUES (
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
                  '${newUser.password}')`);

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
  // Add more service layer functions as needed to this class
}
