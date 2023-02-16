"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressLoader = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("../controllers/routes");
const cors_1 = __importDefault(require("cors"));
const ExpressLoader = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({ limit: "1mb" }));
    app.use((0, routes_1.Routes)());
    console.log("Express Loaded...");
};
exports.ExpressLoader = ExpressLoader;
