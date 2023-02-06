/** @format */

const express = require("express");
const fs = require("fs");
const data = require("../accounts.ts");

const router = express.Router();

var selectedUser;

router.post("/", (req, res) => {
  selectedUser = data.users.find(
    (u) => req.body.username === u.username && req.body.passwd === u.passwd
  );

  if (selectedUser) {
    res.send({ auth: "true" });
  } else {
    res.send({ auth: "false" });
  }
});

router.post("/adduser", (req, res) => {
  let newUser = req.body;

  newUser.id = `${data.users.length + 1}`;

  if (data.users.find((e) => newUser.email === e.email)) {
    return res.send({ res: "Email already exists" }); //will the client "hang" until a response is recieved?
  }

  if (data.users.find((u) => newUser.username === u.username)) {
    return res.send({ res: "User already registered" });
  }

  data.users.push(req.body);

  fs.writeFile(
    "./accounts.ts",
    `module.exports.users = ${JSON.stringify(data.users)}`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  return res.send({ res: "User added" });
});

router.get("/getlog", (req, res) => {
  let fileName = "";

  console.log(selectedUser)
  if (selectedUser) {
    fileName = `./logs/${selectedUser.username}.ts`;

    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      return res.send(data);
    });
  }
});

module.exports = router;
