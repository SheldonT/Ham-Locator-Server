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
const logs_service_1 = __importDefault(require("../services/logs.service"));
class LogsController {
    constructor(dbConn) {
        this.routes = (0, express_1.Router)();
        this.service = new logs_service_1.default(dbConn);
        this.routes.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            const decend = req.query.decend;
            const userId = yield this.service
                .fetchUserId(id)
                .catch((e) => console.log(e));
            res.send(yield this.service.getLog(userId, decend));
        }));
        this.routes.get("/getrecord", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.uid;
            const rid = req.query.rid;
            const userId = yield this.service
                .fetchUserId(id)
                .catch((e) => console.log(e));
            const record = yield this.service.getRecord(userId, rid);
            res.send(record);
        }));
        this.routes.post("/addrecord", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newRecord = req.body;
            const userId = yield this.service
                .fetchUserId(newRecord.userId)
                .catch((e) => console.log(e));
            const newRecordConfirm = yield this.service
                .addRecord(newRecord, userId)
                .catch((e) => console.log(e));
            res.send(newRecordConfirm);
        }));
        this.routes.post("/editrecord", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.body.userId;
            const record = req.body;
            const userId = yield this.service
                .fetchUserId(uid)
                .catch((e) => console.log(e));
            const edited = yield this.service
                .editRecord(record, userId)
                .catch((e) => console.log(console.log(e)));
            res.send(edited);
        }));
        this.routes.post("/deleterecord", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.body.userId;
            const recordId = req.body.recordId;
            const userId = yield this.service
                .fetchUserId(uid)
                .catch((e) => console.log(e));
            const deleted = yield this.service
                .deleteRecord(userId, recordId)
                .catch((e) => console.log(console.log(e)));
            res.send(deleted);
        }));
        this.routes.get("/async", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            //result from db query is passed as a parameter to the callback function,
            //and sent to client.
            yield this.service.aGetLog(id, (result) => {
                res.send(result);
            });
        }));
    }
}
exports.default = LogsController;
