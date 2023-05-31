"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const mysql = __importStar(require("mysql2"));
const log_model_1 = require("./models/log.model");
const user_model_1 = require("./models/user.model");
class Conn {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.USER,
            password: process.env.MYSQL_PWD,
            database: "HamLocator",
        });
        this.connection.connect(function (err) {
            if (err) {
                return console.error("error: " + err.message);
            }
            console.log("[server]: Connected to the MySQL server.");
        });
        this.connection.query(`CREATE TABLE IF NOT EXISTS logs (${log_model_1.RecordSQL})`);
        this.connection.query(`CREATE TABLE IF NOT EXISTS users (${user_model_1.UserSQL})`);
        this.connection
            .query(`INSERT INTO users (${user_model_1.userColumnNames}) VALUES (UUID(), 
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
exports.default = Conn;
