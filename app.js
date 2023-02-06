/** @format */

const express = require("express");
const cors = require("cors");
const users = require("./controllers/users.controller.ts");
const { config } = require("dotenv");

config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/users", users);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
