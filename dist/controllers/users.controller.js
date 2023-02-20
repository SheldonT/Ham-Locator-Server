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
const express = require("express");
const fs = require("fs");
const db = require("../database.ts");
const data = require("../accounts.ts");
const router = express.Router();
let authUser;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //authUser = data.users.find(
    //(u) => req.body.username === u.username && req.body.passwd === u.passwd
    //);
    const data = yield db
        .promise()
        .query(`SELECT * FROM users WHERE username='${req.body.username}' AND passwd='${req.body.passwd}' `)[0]; //<= [0][0]
    console.log(data[0]);
    if (user[0].length !== 0) {
        user.map((u) => {
            authUser = u.username;
        });
        res.send({ auth: "true" });
    }
    else {
        res.send({ auth: "false" });
    }
}));
router.post("/adduser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newUser = req.body;
    const maxId = yield db.promise().query(`SELECT MAX(id) FROM users`);
    const newUserId = parseInt(Object.values(maxId[0][0])[0]) + 1;
    //check for auto generating ID. (uuid)
    const exists = yield db
        .promise()
        .query(`SELECT * FROM users WHERE username='${newUser.username}' OR email='${newUser.email}' `);
    if (exists[0].length !== 0) {
        return res.send("User Exists");
    }
    else {
        yield db.promise().query(`INSERT INTO users (id, username, email, country, gridloc, privilege, units, passwd) VALUES ( '${newUserId}', '${newUser.username}', '${newUser.email}', '${newUser.country}', 
        '${newUser.gridloc}', '${newUser.priv}', '${newUser.units}', '${newUser.passwd}')`);
    }
    return res.send("User Added");
}));
router.get("/getlog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let authUserLog = [];
    const requestedUser = req.body.username;
    console.log(authUser);
    console.log(requestedUser);
    if (authUser[0].length !== 0) {
        if (authUser[0].username !== requestedUser) {
            return res.send({ res: "User not authenticated" });
        }
        else {
            authUserLog = yield db
                .promise()
                .query(`SELECT * FROM logs WHERE username='${requestedUser}'`);
            return res.send(authUserLog[0]);
        }
    }
    else {
        return res.send({ res: "No Data" });
    }
}));
router.post("/writerecord", (req, res) => {
    let logFilePath = "";
    let fileContent;
    if (authUser) {
        if (authUser.username !== req.body.username) {
            return res.send({ res: "User Not Authenticated" });
        }
        else {
            logFilePath = `./logs/${req.body.username}.json`;
            fs.readFile(logFilePath, "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                fileContent = JSON.parse(data);
                if (req.body.overwrite === "true") {
                    for (let i = 0; i < fileContent.length; i++) {
                        if (JSON.stringify(fileContent[i].id) === req.body.record.id) {
                            fileContent[i] = req.body.record;
                        }
                    }
                    //error checking. What if record with req.body.record.id doesn't exist?
                }
                else {
                    req.body.record.id = fileContent.length + 1;
                    fileContent.push(req.body.record);
                }
                //had to call writeFile within readFile because fileContent is undefined outside
                //readFile callback function. Possible scope problem?
                fs.writeFile(logFilePath, `${JSON.stringify(fileContent)}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
            //fileContent is undefined here, even after being defined inside current scope.
            return res.send({ res: "Done" });
        }
    }
    else {
        return res.send({ res: "User Not Authenticated" });
    }
});
router.get("/getrecord", (req, res) => {
    let logFilePath = "";
    let fileContent;
    let selectedRecord;
    if (authUser) {
        if (authUser.username !== req.body.username) {
            return res.send({ res: "User Not Authenticated" });
        }
        else {
            logFilePath = `./logs/${req.body.username}.json`;
            fs.readFile(logFilePath, "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                fileContent = JSON.parse(data);
                selectedRecord = fileContent.find((c) => JSON.stringify(c.id) === req.body.recordID);
                return res.send(selectedRecord);
            });
        }
    }
    else {
        return res.send({ res: "User Not Authenticated" });
    }
});
module.exports = router;
