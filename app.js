const express = require('express');

const mongoose = require('mongoose');

const PORT = 3000;

const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { ERROR_NOT_FOUND } = require('./errors/errors');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '649c1044f76123dbd46f865c',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  family: 4,
});

app.use(express.json());

app.use('/', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Что-то пошло не так...' });
});

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening ${PORT}`);
});
