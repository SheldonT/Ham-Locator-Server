const express = require("express");
const { config } = require('dotenv');

// Init app and config
const app = express();
config();

const users = require('./controllers/users.controller.ts')

// Needed to receive JSON
app.use(express.json({limit: "1mb"}))


app.get("/", (req, res) => {
  // code here
});
// Define new 'base' route, appens users
app.use('/users', users)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});