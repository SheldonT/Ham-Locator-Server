"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const users_controller_1 = __importDefault(require("./users.controller"));
const Routes = () => {
    const router = (0, express_1.Router)();
    router.use('/users', new users_controller_1.default().routes);
    router.get('/', (req, res) => {
        res.send("Base Route Found");
    });
    return router;
};
exports.Routes = Routes;
