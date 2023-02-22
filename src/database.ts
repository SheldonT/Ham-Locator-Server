/** @format */
import * as mysql from "mysql2";

class Conn {
  public connection: mysql.Connection;
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
      console.log("Connected to the MySQL server.");
    });
  }
}

export default Conn;
