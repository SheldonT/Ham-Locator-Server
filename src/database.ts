/** @format */
import * as mysql from "mysql2";
import { RecordSQL } from "./models/log.model";
import { UserSQL, userColumnNames } from "./models/user.model";

class Conn {
  public connection: any;
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.USER,
      password: process.env.MYSQL_PWD,
      database: "HamLocator",
    });

    this.connection.connect(function (err: any) {
      if (err) {
        return console.error("error: " + err.message);
      }
      console.log("[server]: Connected to the MySQL server.");
    });

    this.connection.query(`CREATE TABLE IF NOT EXISTS logs (${RecordSQL})`);
    this.connection.query(`CREATE TABLE IF NOT EXISTS users (${UserSQL})`);

    this.connection
      .query(`INSERT INTO users (${userColumnNames}) VALUES (UUID(), 
    'DEMO',
    'demo@demo.com',
    'Canada',
    '48.48',
    '-55.47',
    'GN37po',
    'user',
    'metric',
    '9',
    '3.5',
    SHA2('Dem01234',512))`);
  }
}

export default Conn;
