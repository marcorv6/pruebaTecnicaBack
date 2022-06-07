const express = require('express');
const app = express();
const { verificaToken } = require('../middleware/autentificacion');
const route = '/user';
const controllerPath = '../controller/User';
const login = require(`${controllerPath}/login`);
const users = require(`${controllerPath}/users`);
const createUser = require(`${controllerPath}/createUser`);
const updateUser = require(`${controllerPath}/updateUser`);
const deactivateUser = require(`${controllerPath}/deactivateUser`);

app.post(`${route}/login`, (req, res) => {
  return login(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`${route}/users`, (req, res) => {
  return users(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.post(`${route}/createUser`, (req, res) => {
  return createUser(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.put(`${route}/updateUser`, (req, res) => {
  return updateUser(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.post(`${route}/deactivateUser`, (req, res) => {
  return deactivateUser(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = app;
