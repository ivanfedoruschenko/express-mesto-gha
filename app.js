const express = require('express');

const mongoose = require('mongoose');

const PORT = 3000;

const router = require('./routes');
const { ERROR_NOT_FOUND } = require('./errors/errors');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  family: 4,
});

app.use((req, res, next) => {
  req.user = {
    _id: '649c1044f76123dbd46f865c',
  };
  next();
});

app.use(express.json());

app.use(router);

app.use('/', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Неправильный адрес' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening ${PORT}`);
});
