/** @format */

const express = require("express");
const fs = require("fs");
const db = require("../database.ts");
const data = require("../accounts.ts");

const router = express.Router();

let authUser;

router.post("/", async (req, res) => {
  //authUser = data.users.find(
  //(u) => req.body.username === u.username && req.body.passwd === u.passwd
  //);

  authUser = await db
    .promise()
    .query(
      `SELECT email FROM USERS WHERE username='${req.body.username}' AND passwd='${req.body.passwd}' `
    );

  if (authUser[0]) {
    res.send({ auth: "true" });
  } else {
    res.send({ auth: "false" });
  }
});

router.post("/adduser", async (req, res) => {
  let newUser = req.body;
  /*let logFilePath = "";

  //newUser.id = `${data.users.length + 1}`;

  if (data.users.find((u) => newUser.username === u.username)) {
    return res.send({ res: "User already registered" });
  }



  if (data.users.find((e) => newUser.email === e.email)) {
    return res.send({ res: "Email already exists" }); //will the client "hang" until a response is recieved?
  }

  data.users.push(req.body);
  logFilePath = `./logs/${newUser.username}.ts`;

  fs.writeFile(
    "./accounts.ts",
    `module.exports.users = ${JSON.stringify(data.users)}`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFile(logFilePath, `[]`, { flag: "w+" }, (err) => {
    if (err) {
      console.error(err);
    }
  });

  return res.send({ res: "User added" });
  //^^^^^ it works here, but not below with /getlog route*/

  const id = await db.promise().query(`SELECT MAX(id) FROM users`);

  const check = await db
    .promise()
    .query(
      `SELECT * FROM users WHERE username='${newUser.username}' OR email='${newUser.email}' `
    );

  if (check[0].length !== 0) {
    console.log("User Exists");
    return res.send("User Exists");
  } else {
    await db.promise().query(
      `INSERT INTO users (username, email, country, gridloc, privilege, units, passwd) VALUES ('${newUser.username}', '${newUser.email}', '${newUser.country}', 
        '${newUser.gridloc}', '${newUser.priv}', '${newUser.units}', '${newUser.passwd}')`
    );
  }
  return res.send("User Added");
});

router.get("/getlog", (req, res) => {
  let fileName = "";

  if (authUser) {
    if (authUser.username !== req.body.username) {
      return res.send({ res: "User not authenticated" });
    } else {
      fileName = `./logs/${authUser.username}.json`;

      fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        //error handling for non-existent file.
        return res.send(JSON.parse(data));
      });
    }
  } else {
    return res.send({ res: "No Data" });
  }
  //^^^^^ "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
  //always comes up in the terminal, but the app hangs waiting for a response if it's uncommented
  //AND selectedUser is not defined (user is not logged in);
});

router.post("/writerecord", (req, res) => {
  let logFilePath = "";
  let fileContent;

  if (authUser) {
    if (authUser.username !== req.body.username) {
      return res.send({ res: "User Not Authenticated" });
    } else {
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
        } else {
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
  } else {
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
    } else {
      logFilePath = `./logs/${req.body.username}.json`;
      fs.readFile(logFilePath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        fileContent = JSON.parse(data);
        selectedRecord = fileContent.find(
          (c) => JSON.stringify(c.id) === req.body.recordID
        );

        return res.send(selectedRecord);
      });
    }
  } else {
    return res.send({ res: "User Not Authenticated" });
  }
});

module.exports = router;
