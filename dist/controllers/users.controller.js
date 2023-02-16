"use strict";
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
    constructor() {
        this.routes = (0, express_1.Router)();
        this.service = new users_service_1.default();
        this.routes.get('/', (req, res) => {
            res.send("response message");
        });
        this.routes.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const resp = yield this.service.getUser(id);
            res.send(resp);
        }));
        // Add more routes inside the constructor
    }
}
exports.default = UsersController;
