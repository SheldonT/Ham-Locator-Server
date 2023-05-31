"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const logs_controller_1 = __importDefault(require("./logs.controller"));
const Routes = (dbConn) => {
    const router = (0, express_1.Router)();
    const userController = new users_controller_1.default(dbConn);
    const logController = new logs_controller_1.default(dbConn);
    router.use("/users", userController.routes);
    router.use("/logs", logController.routes);
    router.get("/", (req, res) => {
        console.log("base route");
        res.send("Base Route Ham Locator Server");
    });
    return router;
};
exports.Routes = Routes;
