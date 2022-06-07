require('./config/config');
const colors = require('colors');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Plantilla'));

app.use(require('./routes/index'));

app.listen(Number(process.env.PORT), () =>
  console.log(
    `API Plantilla corriendo en el puerto: ${process.env.PORT}`.rainbow
  )
);
