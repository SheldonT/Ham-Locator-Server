/** @format */

import { User } from "../models/user.model";

export default class UserService {
  public db: any;

  constructor(db: any) {
    this.db = db;
  }

  authUser(username: string, passwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT id FROM users WHERE username='${username}' and passwd='${passwd}'`,
        (err: any, results: string[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(results[0]);
            resolve(results[0]);
          }
        }
      );
    });
  }

  //should async before getUser cause the function to return a promise?
  getUser(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM users WHERE id='${id}'`,
        (err: any, results: User[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(results[0]);

            resolve(results[0]);
          }
        }
      );
    });
  }

  addUser(newUser: User): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.connection.query(
        `SELECT * FROM users WHERE username='${newUser.username}' OR email='${newUser.email}'`,
        (err: any, results: User[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (results.length === 0) {
              this.db.connection
                .query(`INSERT INTO users (username, email, country, gridloc, privilege, units, passwd) VALUES ('${newUser.username}', '${newUser.email}', '${newUser.country}', 
              '${newUser.gridloc}', '${newUser.privilege}', '${newUser.units}', '${newUser.password}')`);

              console.log(`User ${newUser.username} added`);
              resolve(`User ${newUser.username} added`);
            } else {
              console.log(`User ${newUser.username} already exists`);
              resolve(`User ${newUser.username} already exists`);
            }
          }
        }
      );
    });
  }
  // Add more service layer functions as needed to this class
}
