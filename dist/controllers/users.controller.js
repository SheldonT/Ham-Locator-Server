"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = __importDefault(require("../services/users.service"));
class UsersController {
    constructor(dbConn) {
        this.routes = (0, express_1.Router)();
        this.service = new users_service_1.default(dbConn);
        this.routes.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const passwd = req.body.passwd;
            const authUser = yield this.service
                .authUser(username, passwd)
                .catch((e) => console.log(e));
            if (authUser !== "-1") {
                req.session.user = authUser;
                req.session.loggedIn = true;
                //res.set("Set-Cookie", `hlSession=${req.sessionID}; Path=/; HttpOnly;`);
                console.log("Setting cookie");
                res.cookie("hlSession", req.sessionID, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    path: "/",
                    secure: true,
                });
                res.send(req.sessionID);
            }
            else {
                req.session.loggedIn = false;
                res.send("-1");
            }
        }));
        this.routes.get("/session", (req, res) => __awaiter(this, void 0, void 0, function* () {
            let validSession = false;
            if (req.cookies.hlSession) {
                validSession = yield this.service
                    .sessionUser(req.cookies.hlSession)
                    .catch((e) => console.log(e));
                if (validSession === true) {
                    res.send(req.cookies.hlSession);
                }
                else {
                    res.send("-1");
                }
            }
            else {
                res.send("-1");
            }
        }));
        this.routes.get("/getuser", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            const userId = yield this.service
                .fetchUserId(id)
                .catch((e) => console.log(e));
            const resp = yield this.service
                .getUser(userId)
                .catch((e) => console.log(e));
            res.send(resp);
        }));
        this.routes.post("/adduser", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            if (Object.keys(newUser).length === 0) {
                console.log("No user data found");
                res.send("No user data found.");
            }
            else {
                const resp = yield this.service
                    .addUser(newUser)
                    .catch((e) => console.log(e));
                res.send(resp);
            }
        }));
        this.routes.post("/edituser", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUserData = req.body;
            //const userId: string = req.body.userId;
            const userId = yield this.service
                .fetchUserId(req.body.userId)
                .catch((e) => console.log(e));
            const resp = this.service
                .editUser(newUserData, userId)
                .catch((e) => console.log(e));
            res.send(resp);
        }));
        this.routes.get("/logout", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const sessionId = req.query.sessionId;
            const isLoggedOut = yield this.service
                .logout(sessionId)
                .catch((e) => console.log(e));
            res.send(isLoggedOut);
        }));
    }
}
exports.default = UsersController;
