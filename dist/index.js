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
const express_1 = __importDefault(require("express"));
const express_loader_1 = require("./loaders/express-loader");
const dotenv_1 = __importDefault(require("dotenv"));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const app = (0, express_1.default)();
        const port = process.env.PORT;
        const frontEndHost = process.env.FRONT_END_HOST;
        const secret = process.env.SECRET;
        (0, express_loader_1.ExpressLoader)(app, frontEndHost, secret);
        app
            .listen(port, () => console.log(`[server]: Ham-Locator-Server 1.16 is running on port ${port}`))
            .on("error", (err) => {
            console.log(`[server]: Error while starting server => ${err}`);
            process.exit(1);
        })
            .on("close", () => __awaiter(this, void 0, void 0, function* () {
            console.log(`[server]: Server closed`);
        }));
    });
}
start();
////"start": "nodemon ./src/index.ts --watch src --ext js,mjs,json,ts",
//"main": "index.ts",
