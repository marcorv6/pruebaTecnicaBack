const express = require("express");
const app = express();

app.use(require("./Gender"));
app.use(require("./User"));
app.use(require("./UserType"));

module.exports = app;
