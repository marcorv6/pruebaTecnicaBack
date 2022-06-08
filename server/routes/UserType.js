const express = require('express');
const app = express();
const route = '/userType';
const controllerPath = '../controller/UserType';
const getAll = require(`${controllerPath}/getAll`);

app.get(`${route}/getAll`, (req, res) => {
  return getAll(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = app;
