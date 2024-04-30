/** @format */
import pgPromise from "pg-promise";
import { RecordPSQL } from "./models/log.model";
import { UserPSQL, userColumnNames } from "./models/user.model";

class Conn {
  //public connection: any;
  public pgConn: any;
  public pgP: any;

  constructor() {
    /*this.connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.USER,
      password: process.env.MYSQL_PWD,
      database: "HamLocator",
    });*/

    /////////PostgreSQL Migration

    // Custom serializer function

    this.pgP = pgPromise();

    this.pgConn = this.pgP({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
    });
    /////////////////////////////

    //////PostgreSQL Migration
    this.runQuery(`CREATE TABLE IF NOT EXISTS logs (${RecordPSQL})`);
    this.runQuery(`CREATE TABLE IF NOT EXISTS users (${UserPSQL})`);
    //////////

    //////PostgreSQL Migration

    this.runQuery(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    this.runQuery(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

    this
      .runQuery(`INSERT INTO users (${userColumnNames}) VALUES (uuid_generate_v4(), 
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
    encode(digest('Dem01234', 'sha512'), 'hex') )`);
    /////////
  }

  //allows us to use async function to call a query rather than a promise.
  private runQuery = async (queryString: string) => {
    try {
      await this.pgConn.query(queryString);

      return true;
    } catch (e) {
      console.log(`[DBError]: ${e} While Connecting to PostgreSQL`);

      return false;
    }
  };
}

export default Conn;
