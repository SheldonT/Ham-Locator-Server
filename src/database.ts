/** @format */
import * as mysql from "mysql2";
import { RecordSQL } from "./models/log.model";
import { UserSQL } from "./models/user.model";

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
  }
}

export default Conn;
