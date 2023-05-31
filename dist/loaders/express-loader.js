"use strict";
/** @format */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressLoader = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("../controllers/routes");
const database_1 = __importDefault(require("../database"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const expressSession = __importStar(require("express-session"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const ExpressLoader = (app, feHost, secret) => {
    const dbConn = new database_1.default();
    const MySQLStore = (0, express_mysql_session_1.default)(expressSession);
    const sessionStore = new MySQLStore({}, dbConn.connection);
    dotenv_1.default.config();
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({ origin: feHost, credentials: true }));
    app.use(express_1.default.json({ limit: "1mb" }));
    app.use((0, cookie_parser_1.default)(secret));
    app.use((0, express_session_1.default)({
        secret: secret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
            httpOnly: true,
            secure: true,
        },
    }));
    app.use((0, routes_1.Routes)(dbConn));
    console.log("[server]: Express Loaded...");
};
exports.ExpressLoader = ExpressLoader;
