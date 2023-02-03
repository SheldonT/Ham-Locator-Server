/** @format */

const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const data = require("./accounts.js");
const jdata = require("./accounts.json");

config();

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(cors());

app.get("/auth", cors(), (req, res) => {
  console.log(req.body.data);
  //console.log(data);
  res.send(jdata.sheldon);
});

/*app.post("/", (req, res) => {
  console.log(req.body.data.name);
  res.send("Post");
});*/

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
