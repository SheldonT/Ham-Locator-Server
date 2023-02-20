/** @format */
import * as mysql from "mysql2";

class Conn {
  public readonly connection: mysql.Connection;
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "sheldon",
      password: "tP1yhN67~vi",
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

//tP1yhN67~vi
