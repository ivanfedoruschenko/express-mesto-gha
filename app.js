require('dotenv').config();

const express = require('express');
const cors = require('cors');

// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB } = require('./utils/config');

const PORT = SERVER_PORT;
const router = require('./routes');

const app = express();
const centralError = require('./middlewares/centralError');

mongoose.connect(DB, {
  family: 4,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening ${PORT}`);
});
