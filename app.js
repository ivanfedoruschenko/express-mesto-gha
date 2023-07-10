const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');

const mongoose = require('mongoose');

const PORT = 3000;
const router = require('./routes');

const app = express();
const centralError = require('./middlewares/centralError');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  family: 4,
});

app.use(express.json());

app.use(router);
app.use(errors());

app.use(centralError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening ${PORT}`);
});
