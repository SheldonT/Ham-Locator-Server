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
const dotenv_1 = __importDefault(require("dotenv"));
const express_loader_1 = require("./loaders/express-loader");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const app = (0, express_1.default)();
        const port = 3007; //process.env.PORT;
        (0, express_loader_1.ExpressLoader)(app);
        app
            .listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        })
            .on("error", (err) => {
            console.log(err);
            process.exit(1);
        })
            .on("close", () => __awaiter(this, void 0, void 0, function* () {
            console.log("SERVER CLOSE");
        }));
    });
}
start();
